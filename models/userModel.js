const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
    },

    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Provide a valid email!'],
    },

    role: {
      type: String,
      enum: ['admin', 'supAdmin', 'user'],
      default: 'user',
    },

    password: {
      type: String,
      required: [true, 'Password is required!'],
      minlength: 8,
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, 'Password confirm is required!'],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Password confirm is wrong',
      },
    },

    passwordChangedAt: Date,

    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// Active users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });

  next();
});

// inheritance methods
userSchema.methods.comparePasswords = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.checkIfPasswordChanged = function (jwtIat) {
  if (this.passwordChangedAt) {
    const convertingToSeconds = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return convertingToSeconds > jwtIat;
  }

  return false;
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
