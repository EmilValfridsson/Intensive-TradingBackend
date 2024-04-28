/*
  Warnings:

  - The required column `id` was added to the `FavoriteStock` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "FavoriteStock" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "FavoriteStock_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "UserStock" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "favoriteStockId" TEXT NOT NULL,

    CONSTRAINT "UserStock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserStock" ADD CONSTRAINT "UserStock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStock" ADD CONSTRAINT "UserStock_favoriteStockId_fkey" FOREIGN KEY ("favoriteStockId") REFERENCES "FavoriteStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
