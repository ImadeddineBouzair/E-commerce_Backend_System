const router = require('express').Router();

const { getAllUsers } = require('../controllers/userController');
const {
  signUp,
  signIn,
  protect,
  restricTo,
} = require('../controllers/authenticationController');

router.post('/signUp', signUp);
router.post('/signIn', signIn);

router.route('/').get(protect, restricTo('admin'), getAllUsers);

module.exports = router;
