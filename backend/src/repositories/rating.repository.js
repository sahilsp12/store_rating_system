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

module.exports = {
  count,
  create,
  update,
  
  findByUserAndStore,
  getAverageRating,
};