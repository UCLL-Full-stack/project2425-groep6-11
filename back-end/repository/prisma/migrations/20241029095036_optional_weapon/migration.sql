-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_characterId_fkey";

-- AlterTable
ALTER TABLE "Weapon" ALTER COLUMN "characterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
