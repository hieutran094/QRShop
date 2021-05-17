import express from'express';
import * as authMiddleware from '../middleware/authMiddleware.js';
import * as authController from '../controllers/authController.js';
import * as products from '../controllers/product.js';
const router=express.Router();


router.post('/api/login',authController.login);
router.get('/',(req,res,next)=>{
    res.sendFile('index.html');
})
router.use(authMiddleware.isAuth);
router.get('/api/products',products.getListProduct);
export {router};