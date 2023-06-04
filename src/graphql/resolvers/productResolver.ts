import { Resolvers, Sort } from "@/types/generated-graphql-types";
import { slugify } from "@/utils/slug";

export const productResolver: Resolvers = {
  Query: {
    products: async (_, args, contextValue) => {
      return await contextValue.prisma.product.findMany({
        take: args.limit || 10,
        skip: args.offset || 0,
        include: { category: true },
        orderBy: { createdAt: args.orderBy?.createdAt || Sort.Desc },
        ...(args.filterBy && {
          where: {
            category: {
              id: Number(args.filterBy.categoryId),
            },
          },
        }),
      });
    },
  },
  Mutation: {
    createProduct: async (_, args, contextValue) => {
      const { title, price, categoryId } = args;
      const product = await contextValue.prisma.product.create({
        data: {
          title,
          slug: slugify(title),
          price,
          categoryId,
        },
        include: { category: true },
      });
      contextValue.pubsub.publish("PRODUCT_ADDED", { productAdded: product });
      return product;
    },
  },
  Subscription: {
    productAdded: {
      subscribe: (_, __, contextValue) => {
        return contextValue.pubsub.asyncIterator(["PRODUCT_ADDED"]);
      },
    },
  },
};

export default productResolver;
