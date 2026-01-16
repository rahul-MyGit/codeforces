/*
  Warnings:

  - Added the required column `otp` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otpExpiry` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otpExpiry` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "otp" TEXT NOT NULL,
ADD COLUMN     "otpExpiry" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp" TEXT NOT NULL,
ADD COLUMN     "otpExpiry" TIMESTAMP(3) NOT NULL;
