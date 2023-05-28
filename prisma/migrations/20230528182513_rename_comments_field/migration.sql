/*
  Warnings:

  - You are about to drop the column `commments` on the `invite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invite" DROP COLUMN "commments",
ADD COLUMN     "comments" TEXT;
