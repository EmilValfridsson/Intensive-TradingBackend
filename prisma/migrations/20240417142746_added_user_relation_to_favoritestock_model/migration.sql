-- AlterTable
ALTER TABLE "FavoriteStock" ADD COLUMN     "username" TEXT;

-- AddForeignKey
ALTER TABLE "FavoriteStock" ADD CONSTRAINT "FavoriteStock_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
