-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'woman');

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "gender" "Gender";
