-- CreateEnum
CREATE TYPE "GuestType" AS ENUM ('common', 'honor');

-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('waiting', 'confirmed', 'refused');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('failed', 'delivered', 'pending');

-- CreateEnum
CREATE TYPE "MessageChannel" AS ENUM ('whatsapp', 'email');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "GuestType" NOT NULL DEFAULT 'common',
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invite" (
    "id" TEXT NOT NULL,
    "status" "InviteStatus" NOT NULL DEFAULT 'waiting',
    "companions" INTEGER NOT NULL DEFAULT 0,
    "commments" TEXT,
    "guestId" TEXT NOT NULL,

    CONSTRAINT "invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "channel" "MessageChannel" NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'pending',
    "type" TEXT NOT NULL,
    "failedReason" TEXT,
    "guestId" TEXT NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "invite" ADD CONSTRAINT "invite_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
