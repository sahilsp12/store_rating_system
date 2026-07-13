const prisma = require("../config/prisma");

const { buildPagination,buildSorting,} = require("../utils/queryBuilder");

const userProfileSelect = {
  id: true,
  name: true,
  email: true,
  address: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

const findByIdWithPassword = (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const findById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: userProfileSelect,
  });
};

const findByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
    select: userProfileSelect,
  });
};

const findByEmailWithPassword = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const create = (data) => {
  return prisma.user.create({
    data,
    select: userProfileSelect,
  });
};

const updatePassword = (id, password) => {
  return prisma.user.update({
    where: { id },
    data: { password },
    select: userProfileSelect,
  });
};

const count = () => {
  return prisma.user.count();
};

const findStoreOwnerById = () =>{
  return prisma.user.findFirst({
    where: {
      id,
      role: "STORE_OWNER",
    },
  });
};

const findUsers = async ({
  search = "",
  role,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
}) => {
  const { skip, take } = buildPagination(page, limit);

  const { orderBy } = buildSorting(
    sortBy,
    order,
    ["name", "email", "address", "role", "createdAt"]
  );

  const where = {
    ...(role && { role }),

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

 const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
      },
      skip,
      take,
      orderBy,
    }),

    prisma.user.count({
      where,
    }),
  ]);

  return {
    users,
    total,
  };
};

const findUserDetails = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      ownedStore: true,
      ratings: {
        include: {
          store: true,
        },
      },
    },
  });
};

const findByIdWithStore = (id) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      ownedStore: true,
    },
  })
}

module.exports = {
  findById,
  findByEmail,
  findByEmailWithPassword,
  create,
  updatePassword,
  findByIdWithPassword,
  
  count,
  findStoreOwnerById,
  findUsers,
  findUserDetails,
  findByIdWithStore,
};