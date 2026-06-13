-- CreateEnum
CREATE TYPE "LayoutType" AS ENUM ('STORY', 'ARCHIVE', 'EXPLORE', 'SPLIT');

-- CreateEnum
CREATE TYPE "LayoutPosition" AS ENUM ('LEFT', 'CENTER', 'RIGHT', 'HERO');

-- CreateEnum
CREATE TYPE "ComponentType" AS ENUM ('HERO', 'SMALL', 'LIST', 'INSIGHT', 'HEADLINE', 'SPLIT_CARD', 'SPLIT_SECTION', 'STORY_LIVE_SIGNAL', 'STORY_RIGHT_PANEL', 'TRENDING_PANEL', 'DISCOVERY_NODES', 'ARCHIVE_LOGS', 'ARCHIVE_CATEGORY_INDEX', 'CTA');

-- CreateTable
CREATE TABLE "Layout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "LayoutType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Layout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LayoutComponent" (
    "id" TEXT NOT NULL,
    "layoutId" TEXT NOT NULL,
    "type" "ComponentType" NOT NULL,
    "position" "LayoutPosition" NOT NULL,
    "order" INTEGER NOT NULL,
    "config" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LayoutComponent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LayoutComponent_layoutId_idx" ON "LayoutComponent"("layoutId");

-- CreateIndex
CREATE INDEX "LayoutComponent_layoutId_position_idx" ON "LayoutComponent"("layoutId", "position");

-- AddForeignKey
ALTER TABLE "LayoutComponent" ADD CONSTRAINT "LayoutComponent_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "Layout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
