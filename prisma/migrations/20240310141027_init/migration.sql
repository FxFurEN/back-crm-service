/*
  Warnings:

  - Added the required column `orderId` to the `Execution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Execution" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Execution" ADD CONSTRAINT "Execution_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
