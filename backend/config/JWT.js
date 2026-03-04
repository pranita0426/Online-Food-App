const jwt = require('jsonwebtoken');

// Helper to ensure the secret is available
const requireSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return process.env.JWT_SECRET;
};

const generateToken = (userId) => {
    const secret = requireSecret();
    return jwt.sign({ userId }, secret, { expiresIn: "48h" });
};

const getUserIdFromToken = (token) => {
    const secret = requireSecret();
    const decodedToken = jwt.verify(token, secret);
    return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };
