-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GAME_MASTER', 'PLAYER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PLAYER';
