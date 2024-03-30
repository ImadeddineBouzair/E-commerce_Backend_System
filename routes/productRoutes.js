const router = require('express').Router();

const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect } = require('../controllers/authenticationController');

router.route('/').get(getAllProducts).post(createProduct);
router
  .route('/:id')
  .get(getOneProduct)
  .patch(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
