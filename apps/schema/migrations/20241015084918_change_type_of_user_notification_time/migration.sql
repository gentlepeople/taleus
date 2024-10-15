/*
  Warnings:

  - The `notification_time` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "notification_time",
ADD COLUMN     "notification_time" VARCHAR(5);

-- CreateIndex
CREATE INDEX "index_users_notification_time" ON "users"("notification_time");
