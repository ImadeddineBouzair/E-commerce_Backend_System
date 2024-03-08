const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const asyncVerify = (token) => {
  return new Promise(function (resolve, reject) {
    return resolve(jwt.verify(token, process.env.JWT_SECRET_KEY));
  });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true, //secure against cross site scripting
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // removing the password from response body
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  const user = new User({
    name,
    email,
    password,
    passwordConfirm,
    role,
  });
  const newUser = await user.save();

  createSendToken(newUser, 201, res);
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password))
    return next(new AppError('Email and password fields are required!', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!(user && (await user.comparePasswords(password))))
    return next(
      new AppError('Invalid email or password, Pleas try again!', 401)
    );

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(
      new AppError('You are not logged in, Pleas log in to get access!', 401)
    );

  const decodedToken = await asyncVerify(token);
  const currentUser = await User.findById(decodedToken.id);

  if (!currentUser)
    return next(
      new AppError('The user belonging to this ID does no longer exist!', 401)
    );

  if (currentUser.checkIfPasswordChanged(decodedToken.iat))
    return next(
      new AppError('User recently changed password, Pleas log in again!', 401)
    );

  req.user = currentUser;

  next();
});

exports.restricTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You do not have permission to perform this action!', 403)
      );

    next();
  };
