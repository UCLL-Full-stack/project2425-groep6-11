-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_equippedId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_mountId_fkey";

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_mountId_fkey" FOREIGN KEY ("mountId") REFERENCES "Mount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_equippedId_fkey" FOREIGN KEY ("equippedId") REFERENCES "Weapon"("id") ON DELETE SET NULL ON UPDATE CASCADE;