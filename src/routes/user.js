const express = require('express');
// import validateObjectId from '../middlewares/validateObjectId';
const User = require('../controllers/users');

// import verify from '../middlewares/verifyToken';
const router = express.Router();

router.post('/signup', User.createUser);

router.post('/login', User.loginUser);
// create an article

module.exports = router;
