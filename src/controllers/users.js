const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const {
  loginValidation,
  signupValidation,
} = require('../validators/userValidation');
const {onError, onSuccess} = require('../utils/response');
const {generateToken} = require('../middlewares/verifyToken');

class User {
  // create user
  static async createUser(req, res) {
    // validate signup
    const {error} = signupValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    // check user if is already an User

    const emailExist = await UserModel.findOne({email: req.body.email});
    if (emailExist) return onError(res, 400, 'Email already exist');

    // Hash passwords

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const User = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    try {
      const saveUser = await User.save();
      return onSuccess(
        res,
        201,
        `Hi, ${saveUser.name} your have been registred successfully`
      );
    } catch (err) {
      return onError(res, 500, 'Internal Server error');
    }
  }
  static async loginUser(req, res) {
    const {error} = loginValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    // check if is exists

    const user = await UserModel.findOne({email: req.body.email});
    if (!user) return onError(res, 401, 'Invalid Email or Password');

    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return onError(res, 401, 'Invalid Email or Password');

    // create a token

    const token = generateToken(user);
    res.header('auth-token', token).json({
      token,
      message: `Welcome back ${user.name} you Logged in successfully`,
    });
  }
}
module.exports = User;
