/*
  Warnings:

  - The `price` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "login" DROP NOT NULL,
ALTER COLUMN "Password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(10,2);
