import express from 'express';
import { BagRoutes } from '@bag/bag.routes';
import { ProductRoutes } from '@product/product.routes';

export const AppRoutes = express.Router();

AppRoutes.use(BagRoutes);
AppRoutes.use(ProductRoutes);
