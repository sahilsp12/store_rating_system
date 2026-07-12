const { verifyToken } = require("../utils/jwt");
const { error } = require("../utils/response");
const messages = require("../constants/messages");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return error(res, 401, messages.AUTH.UNAUTHORIZED);
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    return error(res, 401, messages.AUTH.UNAUTHORIZED);
  }
};

module.exports = authMiddleware;