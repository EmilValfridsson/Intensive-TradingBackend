/*
  Warnings:

  - You are about to drop the column `favoriteStockId` on the `UserStock` table. All the data in the column will be lost.
  - Added the required column `favoriteTicker` to the `UserStock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserStock" DROP CONSTRAINT "UserStock_favoriteStockId_fkey";

-- AlterTable
ALTER TABLE "UserStock" DROP COLUMN "favoriteStockId",
ADD COLUMN     "favoriteTicker" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserStock" ADD CONSTRAINT "UserStock_favoriteTicker_fkey" FOREIGN KEY ("favoriteTicker") REFERENCES "FavoriteStock"("ticker") ON DELETE RESTRICT ON UPDATE CASCADE;
