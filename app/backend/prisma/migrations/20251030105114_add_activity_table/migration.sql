-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('USER_REGISTERED', 'TESTIMONIAL_SUBMITTED', 'BLOG_PUBLISHED', 'PARTNER_ADDED', 'ACTION_PUBLISHED');

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
