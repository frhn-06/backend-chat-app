import express from 'express';
import dummyController from '../controllers/dummy.controller';
import authController from '../controllers/auth.controller';
import authMiddleware from '../middleware/auth.middleware';
import conversationController from '../controllers/conversation.controller';
import messageController from '../controllers/message.controller';

const router = express.Router();

// router.get("/", dummyController.dummy);




//////////////////////////////////////////////////////////////////////////////////////

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

router.post("/auth/login", authController.login
    /*
      #swagger.tags = ["Auth"]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest"
            }
          }
        }
      }
    */
);

router.get("/auth/me", authMiddleware, authController.me
    /*
      #swagger.tags = ["Auth"]
      #swagger.security = [{
        "bearerAuth" : []
      }]
    */
);

//////////////////////////////////////////////////////////////////////////////////////
















//////////////////////////////////////////////////////////////////////////////////////

router.get("/conversation", [authMiddleware], conversationController.findAll
    /*
      #swagger.tags = ["Conversation"]
      #swagger.security = [{
        "bearerAuth" : []
      }]
    */
);

//////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////

router.post("/message", [authMiddleware], messageController.create
    /*
      #swagger.tags = ["Message"]
      #swagger.security = [{
        "bearerAuth" : []
      }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/MessageRequest"
            }
          }
        }
      }
    */
);


//////////////////////////////////////////////////////////////////////////////////////


export default router