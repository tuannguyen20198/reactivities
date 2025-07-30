/*
  Warnings:

  - Added the required column `hostId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "hostId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Activity_hostId_idx" ON "Activity"("hostId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
