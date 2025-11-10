/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `Testimonial` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ManualStatisticType" AS ENUM ('BENEFICIARIES', 'CLOTHES_KG', 'WORKSHOPS');

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "avatarUrl";

-- CreateTable
CREATE TABLE "ManualStatistic" (
    "id" TEXT NOT NULL,
    "type" "ManualStatisticType" NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManualStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManualStatisticEntry" (
    "id" TEXT NOT NULL,
    "manualStatisticId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManualStatisticEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ManualStatisticEntry" ADD CONSTRAINT "ManualStatisticEntry_manualStatisticId_fkey" FOREIGN KEY ("manualStatisticId") REFERENCES "ManualStatistic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
