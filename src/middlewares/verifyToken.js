const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token)
    return res.status(401).json({
      message: 'access denied',
    });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      error: 'invalid token',
    });
  }
};

// generate token function
const generateToken = (userinfo) => {
  try {
    const payload = {
      id: userinfo.id,
      name: userinfo.name,
      email: userinfo.email,
    };
    const token = jwt.sign({payload: payload}, process.env.TOKEN_SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  } catch (error) {
    return error;
  }
};

module.exports = {verifyToken, generateToken};
