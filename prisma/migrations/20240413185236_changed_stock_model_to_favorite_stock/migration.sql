/*
  Warnings:

  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Stock";

-- CreateTable
CREATE TABLE "FavoriteStock" (
    "ticker" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteStock_ticker_key" ON "FavoriteStock"("ticker");
