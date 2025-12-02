/*
  Warnings:

  - Added the required column `from` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mail" ADD COLUMN     "from" TEXT NOT NULL;
