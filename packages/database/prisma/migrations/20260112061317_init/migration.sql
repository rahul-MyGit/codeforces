-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cpuTimeLimit" INTEGER NOT NULL,
    "memoryTimeLimit" INTEGER NOT NULL,

    CONSTRAINT "Problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisibleTestCases" (
    "id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "VisibleTestCases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HiddenTestCases" (
    "id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "HiddenTestCases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisibleTestCases" ADD CONSTRAINT "VisibleTestCases_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HiddenTestCases" ADD CONSTRAINT "HiddenTestCases_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
