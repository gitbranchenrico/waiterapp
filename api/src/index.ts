import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';


import { router } from './router';

mongoose.connect('mongodb://mongo:27017')
  .then(() => {
    const app = express();

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    const PORT = process.env.EXPRESS_PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

    console.log('📦 Successfully connected to MongoDB');
  })
  .catch(() => console.log('⛔ Failed to connected to MongoDB'));
