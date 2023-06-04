import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const furniture = await prisma.category.create({
    data: {
      title: "Furniture",
      slug: "furniture",
    },
  });
  const art = await prisma.category.create({
    data: {
      title: "Art",
      slug: "art",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
