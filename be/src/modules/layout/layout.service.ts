import { prisma } from "@/shared/prisma.js";

class LayoutService {
  async getLayout(type: string) {
    return prisma.layout.findFirst({
      where: {
        type: type.toUpperCase() as any,
      },
      include: {
        components: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });
  }

  async saveLayout(type: string, components: any[]) {
    const layoutType = type.toUpperCase();

    let layout = await prisma.layout.findFirst({
      where: {
        type: layoutType as any,
      },
    });

    if (!layout) {
      layout = await prisma.layout.create({
        data: {
          name: type,
          type: layoutType as any,
        },
      });
    }

    await prisma.layoutComponent.deleteMany({
      where: {
        layoutId: layout.id,
      },
    });

    for (let i = 0; i < components.length; i++) {
      await prisma.layoutComponent.create({
        data: {
          layoutId: layout.id,
          type: components[i].type,
          position: components[i].position,
          order: i,
          config: components[i].config ?? {},
        },
      });
    }

    return prisma.layout.findUnique({
      where: {
        id: layout.id,
      },
      include: {
        components: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });
  }
}

export default new LayoutService();
