/*
  Warnings:

  - The primary key for the `CheckLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `CheckLog` table. All the data in the column will be lost.
  - You are about to drop the column `monitorId` on the `CheckLog` table. All the data in the column will be lost.
  - You are about to drop the column `responseTime` on the `CheckLog` table. All the data in the column will be lost.
  - You are about to drop the column `statusCode` on the `CheckLog` table. All the data in the column will be lost.
  - The `id` column on the `CheckLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Incident` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `monitorId` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `resolvedAt` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `Incident` table. All the data in the column will be lost.
  - The `id` column on the `Incident` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Monitor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Monitor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Monitor` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Monitor` table. All the data in the column will be lost.
  - The `id` column on the `Monitor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `name` on the `Monitor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `url` on the `Monitor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2048)`.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `monitorid` to the `CheckLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsetime` to the `CheckLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monitorid` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `Monitor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CheckLog" DROP CONSTRAINT "CheckLog_monitorId_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_monitorId_fkey";

-- DropForeignKey
ALTER TABLE "Monitor" DROP CONSTRAINT "Monitor_userId_fkey";

-- DropIndex
DROP INDEX "Monitor_userId_idx";

-- AlterTable
ALTER TABLE "CheckLog" DROP CONSTRAINT "CheckLog_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "monitorId",
DROP COLUMN "responseTime",
DROP COLUMN "statusCode",
ADD COLUMN     "createdat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "monitorid" UUID NOT NULL,
ADD COLUMN     "responsetime" INTEGER NOT NULL,
ADD COLUMN     "statuscode" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ADD CONSTRAINT "CheckLog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_pkey",
DROP COLUMN "monitorId",
DROP COLUMN "resolvedAt",
DROP COLUMN "startedAt",
ADD COLUMN     "monitorid" UUID NOT NULL,
ADD COLUMN     "resolvedat" TIMESTAMPTZ(6),
ADD COLUMN     "startedat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Incident_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Monitor" DROP CONSTRAINT "Monitor_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "createdat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userid" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "url" SET DATA TYPE VARCHAR(2048),
ADD CONSTRAINT "Monitor_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "name" VARCHAR(255),
    "image" VARCHAR(255),
    "provider" VARCHAR(50) NOT NULL DEFAULT 'credentials',
    "externalId" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "currentHashedRefreshToken" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "fk_monitor_user" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
