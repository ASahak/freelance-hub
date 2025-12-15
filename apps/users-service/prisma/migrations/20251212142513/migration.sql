/*
  Warnings:

  - The values [AVAILABLE,OPEN,BUSY] on the enum `AvailabilityStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AvailabilityStatus_new" AS ENUM ('available', 'open', 'busy');
ALTER TABLE "public"."profiles" ALTER COLUMN "availabilityStatus" DROP DEFAULT;
ALTER TABLE "profiles" ALTER COLUMN "availabilityStatus" TYPE "AvailabilityStatus_new" USING ("availabilityStatus"::text::"AvailabilityStatus_new");
ALTER TYPE "AvailabilityStatus" RENAME TO "AvailabilityStatus_old";
ALTER TYPE "AvailabilityStatus_new" RENAME TO "AvailabilityStatus";
DROP TYPE "public"."AvailabilityStatus_old";
ALTER TABLE "profiles" ALTER COLUMN "availabilityStatus" SET DEFAULT 'available';
COMMIT;

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "availabilityStatus" SET DEFAULT 'available';
