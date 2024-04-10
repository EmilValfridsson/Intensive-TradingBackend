/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `symbol` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Stock_name_key";

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "symbol" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stock_symbol_key" ON "Stock"("symbol");
