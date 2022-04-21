const { UnauthenticatedError } = require("../errors");

const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.headers.authorization;
  if (!apiKey) {
    throw new UnauthenticatedError("No API key provided");
  }
  if (apiKey !== process.env.API_KEY) {
    throw new UnauthenticatedError("Invalid API key");
  } else {
    next();
  }
};

module.exports = apiKeyMiddleware;
