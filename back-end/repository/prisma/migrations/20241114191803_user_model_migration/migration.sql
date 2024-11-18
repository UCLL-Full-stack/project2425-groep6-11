/*
  Warnings:

  - A unique constraint covering the columns `[equippedId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "equippedId" INTEGER;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "characterId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_characterId_key" ON "User"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_equippedId_key" ON "Character"("equippedId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_equippedId_fkey" FOREIGN KEY ("equippedId") REFERENCES "Weapon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
