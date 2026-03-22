import express from 'express';
import dummyController from '../controllers/dummy.controller';
import authController from '../controllers/auth.controller';

const router = express.Router();

// router.get("/", dummyController.dummy);


router.post("/auth/register", authController.register
    /*
      #swagger.tags = ["Auth"]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterRequest"
            }
          }
        }
      }
    */
);

router.post("/auth/activation", authController.activation
    /*
      #swagger.tags = ["Auth"]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Activation"
            }
          }
        }
      }
    */
);

export default router