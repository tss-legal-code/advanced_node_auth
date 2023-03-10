const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

const {
  JWT_ACCESS_SECRET = 'access abracadabra',
  JWT_REFRESH_SECRET = 'refresh abracadabra'
} = process.env;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30s' });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    // important: this approach provides only one active device per user
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, JWT_REFRESH_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async findRefreshToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();