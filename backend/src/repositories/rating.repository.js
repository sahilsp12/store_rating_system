const prisma = require("../config/prisma");

const count = () => {
  return prisma.rating.count();
};

const create = (data) => {
  return prisma.rating.create({
    data,
  });
};

const update = (userId, storeId, rating) => {
  return prisma.rating.update({
    where: {
      userId_storeId: {
        userId,
        storeId,
      },
    },
    data: {
      rating,
    },
  });
};

const findByUserAndStore = (userId, storeId) => {
  return prisma.rating.findUnique({
    where: {
      userId_storeId: {
        userId,
        storeId,
      },
    },
  });
};

const getAverageRating = (storeId) => {
  return prisma.rating.aggregate({
    where: { storeId },
    _avg: {
      rating: true,
    },
  });
};

const findById = (id) => {
  return prisma.rating.findUnique({
    where: {
      id,
    },
  });
};

const findByStore = (storeId) => {
  return prisma.rating.findMany({
    where: {
      storeId,
    },
  });
};

module.exports = {
  count,
  create,
  update,

  findByUserAndStore,
  getAverageRating,


  findById,
  findByStore,
};