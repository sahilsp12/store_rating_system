const { error } = require("../utils/response");
const messages = require("../constants/messages");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return error(res, 403, messages.AUTH.FORBIDDEN);
    }

    next();
  };
};

module.exports = authorize;