const router = require('express').Router();

const {
  getAllUsers,
  updateAuthenticatedUser,
  deleteAuthenticatedUser,
} = require('../controllers/userController');
const {
  signUp,
  signIn,
  protect,
  restricTo,
} = require('../controllers/authenticationController');

router.post('/signUp', signUp);
router.post('/signIn', signIn);

router.route('/').get(protect, restricTo('admin'), getAllUsers);

router.patch('/updateAuthenticatedUser', protect, updateAuthenticatedUser);
router.delete('/deleteAuthenticatedUser', protect, deleteAuthenticatedUser);

module.exports = router;
