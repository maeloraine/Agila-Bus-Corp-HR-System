/*
  Warnings:

  - A unique constraint covering the columns `[employeeNumber]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeNumber` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "employeeNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "employee_employeeNumber_key" ON "employee"("employeeNumber");
