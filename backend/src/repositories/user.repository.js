const prisma = require("../config/prisma");

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

module.exports = {
  findById,
  findByEmail,
  findByEmailWithPassword,
  create,
  updatePassword,
  findByIdWithPassword,
};