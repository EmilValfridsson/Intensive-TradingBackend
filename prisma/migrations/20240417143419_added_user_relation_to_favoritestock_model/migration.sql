/*
  Warnings:

  - You are about to drop the column `username` on the `FavoriteStock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoriteStock" DROP CONSTRAINT "FavoriteStock_username_fkey";

-- AlterTable
ALTER TABLE "FavoriteStock" DROP COLUMN "username",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "FavoriteStock" ADD CONSTRAINT "FavoriteStock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
