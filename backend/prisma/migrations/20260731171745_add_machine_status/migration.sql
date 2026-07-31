-- CreateEnum
CREATE TYPE "MachineStatus" AS ENUM ('RUNNING', 'STOPPED', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "status" "MachineStatus" NOT NULL DEFAULT 'RUNNING';
