-- CreateEnum
CREATE TYPE "TypeMail" AS ENUM ('NODEMAILER', 'AWS');

-- CreateTable
CREATE TABLE "config_mail" (
    "id" TEXT NOT NULL,
    "type" "TypeMail" NOT NULL,

    CONSTRAINT "config_mail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credentials_aws" (
    "id" TEXT NOT NULL,
    "awsAccessKeyId" TEXT NOT NULL,
    "awsSecretAccessKey" TEXT NOT NULL,

    CONSTRAINT "credentials_aws_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CredentialsNodemailer" (
    "id" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "secure" BOOLEAN NOT NULL DEFAULT false,
    "user" TEXT NOT NULL,
    "pass" TEXT NOT NULL,

    CONSTRAINT "CredentialsNodemailer_pkey" PRIMARY KEY ("id")
);
