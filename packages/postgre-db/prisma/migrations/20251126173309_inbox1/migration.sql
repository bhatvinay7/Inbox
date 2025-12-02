-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PROCESSING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "accessToken" TEXT NOT NULL DEFAULT '',
    "refreshToken" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mail" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "uuid" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "inReplyTo" TEXT,
    "references" TEXT,
    "conversationId" TEXT,
    "parentMailId" UUID,
    "to" TEXT,
    "subject" TEXT,
    "body" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tag" TEXT DEFAULT '',
    "uid" TEXT DEFAULT '',
    "raw" TEXT DEFAULT '',
    "gmailLabels" TEXT DEFAULT '',
    "status" "Status" NOT NULL DEFAULT 'PROCESSING',

    CONSTRAINT "Mail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MailStatus" (
    "id" UUID NOT NULL,
    "delete" BOOLEAN NOT NULL DEFAULT false,
    "isMarked" BOOLEAN NOT NULL DEFAULT false,
    "mailId" UUID NOT NULL,
    "receiverId" UUID NOT NULL,

    CONSTRAINT "MailStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" UUID NOT NULL,
    "mailId" UUID NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" UUID NOT NULL,
    "userId" UUID,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mail_messageId_key" ON "Mail"("messageId");

-- CreateIndex
CREATE INDEX "Mail_userId_idx" ON "Mail"("userId");

-- CreateIndex
CREATE INDEX "Mail_messageId_idx" ON "Mail"("messageId");

-- CreateIndex
CREATE INDEX "Mail_uuid_idx" ON "Mail"("uuid");

-- CreateIndex
CREATE INDEX "Mail_uid_idx" ON "Mail"("uid");

-- CreateIndex
CREATE INDEX "MailStatus_mailId_idx" ON "MailStatus"("mailId");

-- CreateIndex
CREATE INDEX "MailStatus_receiverId_idx" ON "MailStatus"("receiverId");

-- CreateIndex
CREATE INDEX "Attachment_mailId_idx" ON "Attachment"("mailId");

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_parentMailId_fkey" FOREIGN KEY ("parentMailId") REFERENCES "Mail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MailStatus" ADD CONSTRAINT "MailStatus_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MailStatus" ADD CONSTRAINT "MailStatus_mailId_fkey" FOREIGN KEY ("mailId") REFERENCES "Mail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_mailId_fkey" FOREIGN KEY ("mailId") REFERENCES "Mail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
