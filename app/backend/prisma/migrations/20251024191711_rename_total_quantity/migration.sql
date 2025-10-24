/*
  Warnings:

  - You are about to drop the column `total` on the `ManualStatistic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `ManualStatistic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."ManualStatisticEntry" DROP CONSTRAINT "ManualStatisticEntry_manualStatisticId_fkey";

-- AlterTable
ALTER TABLE "ManualStatistic" DROP COLUMN "total",
ADD COLUMN     "totalQuantity" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "ManualStatistic_type_key" ON "ManualStatistic"("type");

-- AddForeignKey
ALTER TABLE "ManualStatisticEntry" ADD CONSTRAINT "ManualStatisticEntry_manualStatisticId_fkey" FOREIGN KEY ("manualStatisticId") REFERENCES "ManualStatistic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
