-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UP', 'DOWN', 'PENDING');

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

-- CreateTable
CREATE TABLE "Monitor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "interval" INTEGER NOT NULL DEFAULT 60,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "userid" UUID NOT NULL,
    "createdat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Monitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "monitorid" UUID NOT NULL,
    "statuscode" INTEGER,
    "responsetime" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "monitorid" UUID NOT NULL,
    "reason" TEXT,
    "startedat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "resolvedat" TIMESTAMPTZ(6),

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "fk_monitor_user" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CheckLog" ADD CONSTRAINT "CheckLog_monitorid_fkey" FOREIGN KEY ("monitorid") REFERENCES "Monitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
