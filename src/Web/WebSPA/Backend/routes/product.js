const express = require('express');
const router = express.Router();

const ProductController = require('./../controllers/product.controller');

router.post('/insert-production', ProductController.insert);

module.exports = router;