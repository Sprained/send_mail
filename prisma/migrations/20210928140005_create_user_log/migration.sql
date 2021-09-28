-- CreateTable
CREATE TABLE "user_logs" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "userCreated" TEXT NOT NULL,

    CONSTRAINT "user_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_logs_userCreated_unique" ON "user_logs"("userCreated");

-- AddForeignKey
ALTER TABLE "user_logs" ADD CONSTRAINT "user_logs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_logs" ADD CONSTRAINT "user_logs_userCreated_fkey" FOREIGN KEY ("userCreated") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
