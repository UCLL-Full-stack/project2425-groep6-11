-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_mountId_fkey";

-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "mountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_mountId_fkey" FOREIGN KEY ("mountId") REFERENCES "Mount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
