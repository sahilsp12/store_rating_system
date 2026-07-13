const storeRepository = require("../repositories/store.repository");
const ratingRepository = require("../repositories/rating.repository");

const messages = require("../constants/messages");

class UserService {
  async getStores(userId, query) {
    const result = await storeRepository.findStores(query);

    const stores = result.stores.map((store) => {
      const totalRatings = store.ratings.length;

      const averageRating =
        totalRatings === 0
          ? 0
          : Number(
              (
                store.ratings.reduce(
                  (sum, rating) => sum + rating.rating,
                  0
                ) / totalRatings
              ).toFixed(1)
            );

      const userRating =
        store.ratings.find(
          (rating) => rating.userId === Number(userId)
        )?.rating ?? null;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        averageRating,
        userRating,
      };
    });

    return {
      stores,
      total: result.total,
    };
  }

  async getStoreDetails(storeId, userId) {
    const store = await storeRepository.findStoreDetails(Number(storeId));

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
                (sum, rating) => sum + rating.rating,
                0
              ) / totalRatings
            ).toFixed(1)
          );

    const userRating =
      store.ratings.find(
        (rating) => rating.userId === Number(userId)
      )?.rating ?? null;

    return {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      owner: store.owner,
      averageRating,
      userRating,
    };
  }

  async submitRating(userId, data) {
    const store = await storeRepository.findById(Number(data.storeId));

    if (!store) {
      const error = new Error(messages.STORE.NOT_FOUND);
      error.status = 404;
      throw error;
    }

    const existingRating = await ratingRepository.findByUserAndStore(
      Number(userId),
      Number(data.storeId)
    );

    if (existingRating) {
      const error = new Error(messages.RATING.ALREADY_SUBMITTED);
      error.status = 409;
      throw error;
    }

    return await ratingRepository.create({
      rating: Number(data.rating),
      userId: Number(userId),
      storeId: Number(data.storeId),
    });
  }

  async updateRating(userId, storeId, rating) {
    const existingRating = await ratingRepository.findByUserAndStore(
      Number(userId),
      Number(storeId)
    );

    if (!existingRating) {
      const error = new Error(messages.RATING.NOT_FOUND);
      error.status = 404;
      throw error;
    }

    return await ratingRepository.update(
      Number(userId),
      Number(storeId),
      Number(rating)
    );
  }
}

module.exports = new UserService();