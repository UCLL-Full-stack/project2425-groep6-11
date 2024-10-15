/*
  Warnings:

  - A unique constraint covering the columns `[mountId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - Made the column `mountId` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_mountId_fkey";

-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "mountId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Character_mountId_key" ON "Character"("mountId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_mountId_fkey" FOREIGN KEY ("mountId") REFERENCES "Mount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
