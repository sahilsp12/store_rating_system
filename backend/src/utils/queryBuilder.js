const buildPagination = (page = 1, limit = 10) => {
  page = Number(page);
  limit = Number(limit);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
  };
};

const buildSorting = (
  sortBy = "createdAt",
  order = "desc",
  allowedFields = []
) => {
  if (!allowedFields.includes(sortBy)) {
    sortBy = "createdAt";
  }

  order = order.toLowerCase() === "asc" ? "asc" : "desc";

  return {
    orderBy: {
      [sortBy]: order,
    },
  };
};

module.exports = {
  buildPagination,
  buildSorting,
};