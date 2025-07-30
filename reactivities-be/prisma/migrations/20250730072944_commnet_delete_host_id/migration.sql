/*
  Warnings:

  - You are about to drop the column `hostId` on the `Activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_hostId_fkey";

-- DropIndex
DROP INDEX "Activity_hostId_idx";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "hostId";
