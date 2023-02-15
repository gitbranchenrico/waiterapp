import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, cb) {

      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

// List Categories
router.get('/categories', listCategories);

// Create Categories
router.post('/categories', createCategory);

// List Products
router.get('/products', listProducts);

// Create Products
router.post('/products', upload.single('image'), createProduct);

// List Products by Category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List Orders
router.get('/orders', (req, res) => {
  res.send('OK');
});

// Create Order
router.patch('/orders/:orderId', (req, res) => {
  res.send('OK');
});

// Delete Order
router.delete('/orders/:orderId', (req, res) => {
  res.send('OK');
});
