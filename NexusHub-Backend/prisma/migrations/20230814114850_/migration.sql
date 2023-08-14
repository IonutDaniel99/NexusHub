-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid_string" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "city_name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_account_name_key" ON "User"("account_name");
