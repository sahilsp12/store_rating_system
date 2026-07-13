const bcrypt = require("bcrypt");

const userRepository = require("../repositories/user.repository");
const storeRepository = require("../repositories/store.repository");
const ratingRepository = require("../repositories/rating.repository");

const messages = require("../constants/messages");

class AdminService {
  async getDashboard() {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
      userRepository.count(),
      storeRepository.count(),
      ratingRepository.count(),
    ]);

    return {
      totalUsers,
      totalStores,
      totalRatings,
    };
  }

  async createUser(data) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      const error = new Error(messages.AUTH.USER_EXISTS);
      error.status = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      address: data.address,
      role: data.role,
    });
  }

  async createStore(data) {
    const owner = await userRepository.findByIdWithStore(data.ownerId);

    if (!owner) {
      const error = new Error(messages.STORE.OWNER_NOT_FOUND);
      error.status = 404;
      throw error;
    }

    if (owner.role !== "STORE_OWNER") {
      const error = new Error(messages.STORE.INVALID_OWNER);
      error.status = 400;
      throw error;
    }

    if (owner.ownedStore) {
      const error = new Error(messages.STORE.OWNER_ALREADY_ASSIGNED);
      error.status = 409;
      throw error;
    }

    const emailExists = await storeRepository.existsByEmail(data.email);

    if (emailExists) {
      const error = new Error(messages.STORE.EMAIL_EXISTS);
      error.status = 409;
      throw error;
    }

    const nameExists = await storeRepository.existsByName(data.name);

    if (nameExists) {
      const error = new Error(messages.STORE.NAME_EXISTS);
      error.status = 409;
      throw error;
    }

    return await storeRepository.create({
      name: data.name,
      email: data.email,
      address: data.address,
      ownerId: data.ownerId,
    });
  }

  async getUsers(query) {
    return await userRepository.findUsers(query);
  }

  async getUserDetails(id) {
    const user = await userRepository.findUserDetails(Number(id));

    if (!user) {
      const error = new Error(messages.AUTH.USER_NOT_FOUND);
      error.status = 404;
      throw error;
    }

    return user;
  }

  async getStores(query) {
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

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner,
        averageRating,
        createdAt: store.createdAt,
      };
    });

    return {
      stores,
      total: result.total,
    };
  }
}

module.exports = new AdminService();