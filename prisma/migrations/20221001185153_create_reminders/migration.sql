-- CreateTable
CREATE TABLE "reminders" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(30) NOT NULL,
    "city" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reminders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reminders_description_date_key" ON "reminders"("description", "date");
