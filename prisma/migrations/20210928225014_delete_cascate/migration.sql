-- DropForeignKey
ALTER TABLE "UserPassword" DROP CONSTRAINT "UserPassword_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_logs" DROP CONSTRAINT "user_logs_userCreated_fkey";

-- AddForeignKey
ALTER TABLE "user_logs" ADD CONSTRAINT "user_logs_userCreated_fkey" FOREIGN KEY ("userCreated") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPassword" ADD CONSTRAINT "UserPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
