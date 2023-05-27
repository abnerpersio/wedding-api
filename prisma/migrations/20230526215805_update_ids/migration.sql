/*
  Warnings:

  - The primary key for the `guest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `invite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `guest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `invite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "invite" DROP CONSTRAINT "invite_guestId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_guestId_fkey";

-- AlterTable
ALTER TABLE "guest" DROP CONSTRAINT "guest_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "guest_id_seq";

-- AlterTable
ALTER TABLE "invite" DROP CONSTRAINT "invite_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guestId" SET DATA TYPE TEXT;
DROP SEQUENCE "invite_id_seq";

-- AlterTable
ALTER TABLE "notification" DROP CONSTRAINT "notification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guestId" SET DATA TYPE TEXT;
DROP SEQUENCE "notification_id_seq";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "user_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "guest_id_key" ON "guest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invite_id_key" ON "invite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "notification_id_key" ON "notification"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- AddForeignKey
ALTER TABLE "invite" ADD CONSTRAINT "invite_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
