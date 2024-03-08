const router = require('express').Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').patch(updateProduct).delete(deleteProduct);

module.exports = router;
