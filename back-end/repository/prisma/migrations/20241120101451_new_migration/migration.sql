/*
  Warnings:

  - Made the column `userId` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "userId" SET NOT NULL;
