const prisma = require("../config/prisma");
const { buildPagination, buildSorting, } = require("../utils/queryBuilder");

const create = (data) => {
  return prisma.store.create({
    data,
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const count = () => {
  return prisma.store.count();
};

const findById = (id) => {
  return prisma.store.findUnique({
    where: { id },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      ratings: true,
    },
  });
};

const findByEmail = (email) => {
  return prisma.store.findUnique({
    where: { email },
  });
};

const findByName = (name) => {
  return prisma.store.findUnique({
    where: { name },
  });
};

const findByOwnerId = (ownerId) => {
  return prisma.store.findUnique({
    where: { ownerId },
    include: {
      ratings: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

const findStores = async ({
  search = "",
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
}) => {
  const { skip, take } = buildPagination(page, limit);

  const { orderBy } = buildSorting(
    sortBy,
    order,
    ["name", "email", "address", "createdAt"]
  );

  const where = {
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
        {
          address: {
            contains: search,
          },
        },
      ],
    }),
  };

  const [stores, total] = await prisma.$transaction([
    prisma.store.findMany({
      where,

      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        ratings: {
          select: {
            rating: true,
          },
        },
      },

      skip,
      take,
      orderBy,
    }),

    prisma.store.count({
      where,
    }),
  ]);

  return {
    stores,
    total,
  };
};

const existsByEmail = async (email) => {
  const store = await prisma.store.findUnique({
    where: {
      email,
    },
  });

  return !!store;
};

const existsByName = async (name) => {
  const count = await prisma.store.count({
    where: {
      name,
    },
  });

  return count > 0;
};

const existsByOwner = async (ownerId) => {
  const count = await prisma.store.count({
    where: {
      ownerId,
    },
  });

  return count > 0;
};

module.exports = {
  create,
  count,

  findById,
  findByEmail,
  findByName,
  findByOwnerId,
  findStores,

  existsByEmail,
  existsByName,
  existsByOwner,

};