import express from 'express';
import dummyController from '../controllers/dummy.controller';
import authController from '../controllers/auth.controller';
import authMiddleware from '../middleware/auth.middleware';
import conversationController from '../controllers/conversation.controller';
import messageController from '../controllers/message.controller';
import mediaMiddleware from '../middleware/media.middleware';
import mediaController from '../controllers/media.controller';

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


router.get("/user/:name", authMiddleware, authController.searchByName
    /*
      #swagger.tags = ["Auth"]
      #swagger.security = [{
        "bearerAuth" : []
      }]
    */
);

router.get("/user/:userId/id", authMiddleware, authController.findUser
    /*
      #swagger.tags = ["Auth"]
      #swagger.security = [{
        "bearerAuth" : []
      }]
    */
);

router.post("/user-add-avatar", [authMiddleware, mediaMiddleware.single("file")], authController.addAvatar
    /*
      #swagger.tags = ["Auth"]
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                avatar : {
                  type: "string",
                  format: "binary"
                }
              }
            }
          }
        }
      }
    */
)

router.delete("/user-remove-avatar", authMiddleware, authController.removeAvatar
    /*
      #swagger.tags = ["Auth"]
      #swagger.security = [{
        "bearerAuth" : []
      }]
    */
)

router.put("/user-update-info", authMiddleware, authController.updateInfo
    /*
      #swagger.tags = ["Auth"]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateInfoRequest"
            }
          }
        }
      }
    */
)

// router.put("/user/:userId/update-avatar", authMiddleware, authController.updateAvatar
//     /*
//       #swagger.tags = ["Auth"]
//       #swagger.requestBody = {
//         required: true,
//         content: {
//           "multipart/form-data": {
//             schema: {
//               type: "object",
//               properties: {
//                 avatar : {
//                   type: "string",
//                   format: "binary"
//                 }
//               }
//             }
//           }
//         }
//       }
//     */
// );

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

router.get("/conversation/:id", [authMiddleware], conversationController.findById
    /*
      #swagger.tags = ["Conversation"]
      #swagger.security = [{
        "bearerAuth" : []
      }]
    */
);

router.get("/conversation/:targetId/participants", [authMiddleware], conversationController.findByParticipants
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

router.get("/message/:targetId/c", [authMiddleware], messageController.findByTargetId
    /*
      #swagger.tags = ["Message"]
      #swagger.security = [{
        "bearerAuth" : []
      }]
    */
);




//////////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////////////////////////////////////////////////////////

router.post("/media/upload-single", [authMiddleware, mediaMiddleware.single("file")], mediaController.single)

router.delete("/media/remove", [authMiddleware], mediaController.remove)









//////////////////////////////////////////////////////////////////////////////////////


export default router