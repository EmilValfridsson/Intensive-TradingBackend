import express from "express";
import { validate } from "../schemas/Stock";
import { PrismaClient } from "@prisma/client";
import auth, { AuthRequest } from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", auth, async (req, res) => {
  const user = (req as AuthRequest).user;

  const favoriteStocks = await prisma.userStock.findMany({
    where: { userId: user.id },
  });
  return res.send(favoriteStocks);
});

router.post("/", auth, async (req, res) => {
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const user = (req as AuthRequest).user;

  const activeUser = await prisma.user.findFirst({
    where: { id: user.id },
  });

  if (!activeUser) return res.status(404).send("user not found");

  try {
    await prisma.$transaction(async (prisma) => {
      const existingFavorite = await prisma.favoriteStock.findFirst({
        where: { ticker: req.body.ticker },
      });

      if (!existingFavorite) {
        const newFavoriteStock = await prisma.favoriteStock.create({
          data: {
            ticker: req.body.ticker,
            UserStock: {
              create: {
                user: { connect: { id: user.id } },
              },
            },
          },
        });

        return res.status(201).send(newFavoriteStock);
      }

      const existingUserStock = await prisma.userStock.findFirst({
        where: { userId: user.id, favoriteTicker: existingFavorite.ticker },
      });

      if (existingUserStock)
        return res.status(400).send("this stock is already favored");

      const newUserStock = await prisma.userStock.create({
        data: {
          user: { connect: { id: user.id } },
          favoriteStock: { connect: { ticker: existingFavorite.ticker } },
        },
      });

      return res.status(200).send(newUserStock);
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add favorite stock" });
  }
});

router.delete("/:ticker", auth, async (req, res) => {
  const user = (req as AuthRequest).user;

  try {
    const favoriteStock = await prisma.favoriteStock.findFirst({
      where: { ticker: req.params.ticker },
    });

    if (!favoriteStock) {
      return res.status(404).send("Favorite stock not found");
    }

    const userStock = await prisma.userStock.findFirst({
      where: {
        userId: user.id,
        favoriteTicker: favoriteStock.ticker,
      },
    });

    if (!userStock) {
      return res.status(404).send("Favorite stock not found for user");
    }

    const deleteFavorite = await prisma.userStock.delete({
      where: {
        id: userStock.id,
      },
    });

    return res.status(200).send(deleteFavorite);
  } catch (error) {
    return res.status(500).json({ error: "Failed to remove favorite stock" });
  }
});

export default router;
