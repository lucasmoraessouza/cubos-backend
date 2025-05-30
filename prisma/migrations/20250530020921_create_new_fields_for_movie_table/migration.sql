/*
  Warnings:

  - You are about to drop the column `description` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `movies` table. All the data in the column will be lost.
  - Added the required column `budget` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalLanguage` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalTitle` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portugueseTitle` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revenue` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synopsis` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteCount` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('ACAO', 'AVENTURA', 'COMEDIA', 'DRAMA', 'TERROR', 'FICCAO_CIENTIFICA');

-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_userId_fkey";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "budget" INTEGER NOT NULL,
ADD COLUMN     "genres" "Genre"[],
ADD COLUMN     "originalLanguage" TEXT NOT NULL,
ADD COLUMN     "originalTitle" TEXT NOT NULL,
ADD COLUMN     "popularity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "portugueseTitle" TEXT NOT NULL,
ADD COLUMN     "revenue" INTEGER NOT NULL,
ADD COLUMN     "synopsis" TEXT NOT NULL,
ADD COLUMN     "voteCount" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
