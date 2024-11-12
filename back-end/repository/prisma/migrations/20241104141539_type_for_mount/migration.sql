/*
  Warnings:

  - Added the required column `base` to the `Mount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mount" ADD COLUMN     "base" TEXT NOT NULL;
