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
  await prisma.product.create({
    data: {
      title: "Chair",
      slug: "chair",
      price: 49.99,
      categoryId: furniture.id,
    },
  });
  await prisma.product.create({
    data: {
      title: "Table",
      slug: "table",
      price: 79.99,
      categoryId: furniture.id,
    },
  });
  await prisma.product.create({
    data: {
      title: "Painting",
      slug: "painting",
      price: 199.99,
      categoryId: art.id,
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
