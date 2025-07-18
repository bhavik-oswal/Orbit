import express from 'express';
import { body } from 'express-validator';
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from '../controllers/captain.controller.js';
import { authCaptain } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', [
    body('fullname.firstname').isLength({ min:3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcyle', 'auto']).withMessage('Vehicle type must be one of car, motorcyle, auto')
], 
    registerCaptain
);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    loginCaptain
);

router.get('/profile', authCaptain, getCaptainProfile);

router.get('/logout', authCaptain, logoutCaptain);

export default router;