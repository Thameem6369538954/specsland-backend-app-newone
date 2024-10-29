const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  singleProduct,
} = require("../controllers/Createproduct");


router.route('/products').post(createProduct);
router.route("/products").get(getProducts);
router.route("/product/:id").get(singleProduct);


module.exports = router