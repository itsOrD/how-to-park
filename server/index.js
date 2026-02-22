require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');

const controller = require('../db/controllers/dbcontrol.js');

const app = express();
const PORT = process.env.PORT || 1111;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [`http://localhost:${PORT}`];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const parkingSpotValidators = [
  body('carSize').isIn(['small', 'medium', 'large']).withMessage('carSize must be small, medium, or large'),
  body('make').notEmpty().isLength({ max: 100 }).withMessage('make is required (max 100 chars)'),
  body('driverStatus').notEmpty().withMessage('driverStatus is required'),
  body('timeOfday').notEmpty().withMessage('timeOfday is required'),
  body('difficulty').isInt({ min: 1, max: 5 }).withMessage('difficulty must be an integer between 1 and 5'),
  body('comments').optional().isLength({ max: 500 }).withMessage('comments max 500 chars'),
];

app.use(express.static(__dirname + '/../public/dist'));

app.route('/data')
  .get(dataLimiter, controller.getAll)
  .post(dataLimiter, parkingSpotValidators, controller.save);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log('Server listening on PORT: ', PORT));
