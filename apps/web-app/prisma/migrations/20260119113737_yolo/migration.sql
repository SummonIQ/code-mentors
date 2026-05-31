-- CreateTable
CREATE TABLE "CurriculumUnit" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "description" TEXT,
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,
    "weeksLabel" TEXT,

    CONSTRAINT "CurriculumUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumLesson" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "description" TEXT,
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "CurriculumLesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FocusMap" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "description" TEXT,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "FocusMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FocusMapNode" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "x" INTEGER,
    "y" INTEGER,

    CONSTRAINT "FocusMapNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FocusMapEdge" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromNodeId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "label" TEXT,
    "mapId" TEXT NOT NULL,
    "toNodeId" TEXT NOT NULL,

    CONSTRAINT "FocusMapEdge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CurriculumUnit_order_idx" ON "CurriculumUnit"("order");

-- CreateIndex
CREATE INDEX "CurriculumUnit_createdAt_idx" ON "CurriculumUnit"("createdAt");

-- CreateIndex
CREATE INDEX "CurriculumLesson_unitId_idx" ON "CurriculumLesson"("unitId");

-- CreateIndex
CREATE INDEX "CurriculumLesson_order_idx" ON "CurriculumLesson"("order");

-- CreateIndex
CREATE INDEX "CurriculumLesson_createdAt_idx" ON "CurriculumLesson"("createdAt");

-- CreateIndex
CREATE INDEX "FocusMap_createdAt_idx" ON "FocusMap"("createdAt");

-- CreateIndex
CREATE INDEX "FocusMapNode_mapId_idx" ON "FocusMapNode"("mapId");

-- CreateIndex
CREATE INDEX "FocusMapNode_createdAt_idx" ON "FocusMapNode"("createdAt");

-- CreateIndex
CREATE INDEX "FocusMapEdge_mapId_idx" ON "FocusMapEdge"("mapId");

-- CreateIndex
CREATE INDEX "FocusMapEdge_createdAt_idx" ON "FocusMapEdge"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "FocusMapEdge_mapId_fromNodeId_toNodeId_key" ON "FocusMapEdge"("mapId", "fromNodeId", "toNodeId");

-- AddForeignKey
ALTER TABLE "CurriculumUnit" ADD CONSTRAINT "CurriculumUnit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumUnit" ADD CONSTRAINT "CurriculumUnit_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumLesson" ADD CONSTRAINT "CurriculumLesson_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "CurriculumUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumLesson" ADD CONSTRAINT "CurriculumLesson_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumLesson" ADD CONSTRAINT "CurriculumLesson_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FocusMap" ADD CONSTRAINT "FocusMap_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FocusMap" ADD CONSTRAINT "FocusMap_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FocusMapNode" ADD CONSTRAINT "FocusMapNode_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "FocusMap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FocusMapEdge" ADD CONSTRAINT "FocusMapEdge_fromNodeId_fkey" FOREIGN KEY ("fromNodeId") REFERENCES "FocusMapNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FocusMapEdge" ADD CONSTRAINT "FocusMapEdge_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "FocusMap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FocusMapEdge" ADD CONSTRAINT "FocusMapEdge_toNodeId_fkey" FOREIGN KEY ("toNodeId") REFERENCES "FocusMapNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
