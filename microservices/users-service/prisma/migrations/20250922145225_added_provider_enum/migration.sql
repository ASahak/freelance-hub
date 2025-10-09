/*
  Warnings:

  - The `provider` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."AuthProvider" AS ENUM ('native', 'google');

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "provider",
ADD COLUMN     "provider" "public"."AuthProvider" NOT NULL DEFAULT 'native';
