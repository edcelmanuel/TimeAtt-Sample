/*
  Warnings:

  - A unique constraint covering the columns `[person_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `person_id` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "person_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_person_id_key" ON "Users"("person_id");
