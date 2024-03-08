const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const customErrorHandler = require('./controllers/errorController');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Security http headers
app.use(helmet());

// Limit request rating
app.use(
  '/api',
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'To many requests from this IP, Pleas try again later!',
  })
);

// Body parser
app.use(express.json({ limit: '10kb' }));

// Data sanitize
app.use(mongoSanitize());

// Data sanitize against XSS
app.use(xss());

// Main routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);

app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(customErrorHandler);

module.exports = app;
