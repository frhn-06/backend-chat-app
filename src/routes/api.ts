import express from 'express';
import dummyController from '../controllers/dummy.controller';
import authController from '../controllers/auth.controller';

const router = express.Router();

// router.get("/", dummyController.dummy);


router.post("/auth/register", authController.register);

router.post("/auth/activation", authController.activation);

export default router