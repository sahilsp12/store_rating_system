const storeRepository = require("../repositories/store.repository");
const messages = require("../constants/messages");

class StoreOwnerService {
  async getDashboard(ownerId) {
    const store = await storeRepository.findByOwnerId(Number(ownerId));

    if (!store) {
      const error = new Error(messages.STORE.NOT_FOUND);
      error.status = 404;
      throw error;
    }

    const totalRatings = store.ratings.length;

    const averageRating =
      totalRatings === 0
        ? 0
        : Number(
            (
              store.ratings.reduce(
                (sum, item) => sum + item.rating,
                0
              ) / totalRatings
            ).toFixed(1)
          );

    return {
      store: {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
      },

      averageRating,

      totalRatings,

      users: store.ratings.map((item) => ({
        id: item.user.id,
        name: item.user.name,
        email: item.user.email,
        rating: item.rating,
      })),
    };
  }
}

module.exports = new StoreOwnerService();