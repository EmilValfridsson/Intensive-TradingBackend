-- CreateTable
CREATE TABLE "Stock" (
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "high" INTEGER NOT NULL,
    "low" INTEGER NOT NULL,
    "close" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "isFavored" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_name_key" ON "Stock"("name");
