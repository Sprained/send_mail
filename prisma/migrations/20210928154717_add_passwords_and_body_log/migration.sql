/*
  Warnings:

  - Added the required column `body` to the `user_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_logs" ADD COLUMN     "body" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "fistAccess" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "UserPassword" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPassword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPassword" ADD CONSTRAINT "UserPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
