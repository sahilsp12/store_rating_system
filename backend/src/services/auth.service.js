const userRepository = require("../repositories/user.repository");

const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

const messages = require("../constants/messages");
const ROLES = require("../constants/roles");

class AuthService {
  async register(data) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      const error = new Error(messages.AUTH.USER_EXISTS);
      error.status = 409;
      throw error;
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      address: data.address,
      role: ROLES.USER,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async login(email, password) {
    const user = await userRepository.findByEmailWithPassword(email);

    if (!user) {
      const error = new Error(messages.AUTH.INVALID_CREDENTIALS);
      error.status = 401;
      throw error;
    }

    const passwordMatched = await comparePassword(
      password,
      user.password
    );

    if (!passwordMatched) {
      const error = new Error(messages.AUTH.INVALID_CREDENTIALS);
      error.status = 401;
      throw error;
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    };
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await userRepository.findByIdWithPassword(userId);

    if (!user) {
      const error = new Error(messages.AUTH.USER_NOT_FOUND);
      error.status = 404;
      throw error;
    }

    const isPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      const error = new Error(messages.AUTH.INVALID_PASSWORD);
      error.status = 400;
      throw error;
    }

    const hashedPassword = await hashPassword(newPassword);

    await userRepository.updatePassword(user.id, hashedPassword);
  }

  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      const error = new Error(messages.AUTH.USER_NOT_FOUND);
      error.status = 404;
      throw error;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}

module.exports = new AuthService();