import { Resolvers, Sort } from "@/types/generated-graphql-types";

interface IOrderBy {
  title?: Sort;
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
};
