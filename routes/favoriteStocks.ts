import express from "express";
import { validate } from "../schemas/Stock";
import { PrismaClient } from "@prisma/client";
import auth from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", auth, async (req, res) => {
  const favoriteStocks = await prisma.favoriteStock.findMany({
    where: { userId: req.userId },
  });
  return res.send(favoriteStocks);
});

router.post("/", auth, async (req, res) => {
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const activeUser = await prisma.user.findFirst({
    where: { id: req.userId },
  });

  if (!activeUser) return res.status(404).send("user not found");

  const ticker = await prisma.favoriteStock.create({
    data: {
      ticker: req.body.ticker,
      userId: activeUser.id,
    },
  });

  return res.status(201).send(ticker);
});

export default router;
