-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_equippedId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_mountId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_characterId_fkey";

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_mountId_fkey" FOREIGN KEY ("mountId") REFERENCES "Mount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_equippedId_fkey" FOREIGN KEY ("equippedId") REFERENCES "Weapon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
