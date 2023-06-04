import { Resolvers, Sort } from "@/types/generated-graphql-types";
import { slugify } from "@/utils/slug";

interface IOrderBy {
  title?: Sort;
  products?: { _count?: Sort };
}

export const categoryResolver: Resolvers = {
  Query: {
    categories: async (_, args, contextValue) => {
      const orderBy: IOrderBy = { title: Sort.Desc };

      return await contextValue.prisma.category.findMany({
        take: args.limit || 10,
        skip: args.offset || 0,
        orderBy,
      });
    },
  },
  Mutation: {
    createCategory: async (_, args, contextValue) => {
      const { title } = args;

      return await contextValue.prisma.category.create({
        data: {
          title,
          slug: slugify(title),
        },
      });
    },
  },
};
