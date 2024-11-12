/*
  Warnings:

  - Added the required column `can_fly` to the `Mount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legs` to the `Mount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reward` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "currency" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Mount" ADD COLUMN     "can_fly" BOOLEAN NOT NULL,
ADD COLUMN     "cost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "legs" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "reward" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Weapon" ADD COLUMN     "cost" INTEGER NOT NULL DEFAULT 0;
