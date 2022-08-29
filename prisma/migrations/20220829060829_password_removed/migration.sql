/*
  Warnings:

  - You are about to drop the column `password` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_password_key";

-- AlterTable
ALTER TABLE "TimeInOut" ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "password";
