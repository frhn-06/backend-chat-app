"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const conversation_controller_1 = __importDefault(require("../controllers/conversation.controller"));
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const media_middleware_1 = __importDefault(require("../middleware/media.middleware"));
const media_controller_1 = __importDefault(require("../controllers/media.controller"));
const router = express_1.default.Router();
// router.get("/", dummyController.dummy);
//////////////////////////////////////////////////////////////////////////////////////
router.post("/auth/register", auth_controller_1.default.register
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
router.post("/auth/activation", auth_controller_1.default.activation
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
router.post("/auth/login", auth_controller_1.default.login
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
router.get("/auth/me", auth_middleware_1.default, auth_controller_1.default.me
/*
  #swagger.tags = ["Auth"]
  #swagger.security = [{
    "bearerAuth" : []
  }]
*/
);
router.get("/user/:name", auth_middleware_1.default, auth_controller_1.default.searchByName
/*
  #swagger.tags = ["Auth"]
  #swagger.security = [{
    "bearerAuth" : []
  }]
*/
);
router.get("/user/:userId/id", auth_middleware_1.default, auth_controller_1.default.findUser
/*
  #swagger.tags = ["Auth"]
  #swagger.security = [{
    "bearerAuth" : []
  }]
*/
);
router.post("/user-add-avatar", [auth_middleware_1.default, media_middleware_1.default.single("file")], auth_controller_1.default.addAvatar
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
);
router.delete("/user-remove-avatar", auth_middleware_1.default, auth_controller_1.default.removeAvatar
/*
  #swagger.tags = ["Auth"]
  #swagger.security = [{
    "bearerAuth" : []
  }]
*/
);
router.put("/user-update-info", auth_middleware_1.default, auth_controller_1.default.updateInfo
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
);
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
router.get("/conversation", [auth_middleware_1.default], conversation_controller_1.default.findAll
/*
  #swagger.tags = ["Conversation"]
  #swagger.security = [{
    "bearerAuth" : []
  }]
*/
);
router.get("/conversation/:id", [auth_middleware_1.default], conversation_controller_1.default.findById
/*
  #swagger.tags = ["Conversation"]
  #swagger.security = [{
    "bearerAuth" : []
  }]
*/
);
router.get("/conversation/:targetId/participants", [auth_middleware_1.default], conversation_controller_1.default.findByParticipants
/*
  #swagger.tags = ["Conversation"]
  #swagger.security = [{
    "bearerAuth" : []
  }]
*/
);
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
router.post("/message", [auth_middleware_1.default], message_controller_1.default.create
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
router.get("/message/:targetId/c", [auth_middleware_1.default], message_controller_1.default.findByTargetId
/*
  #swagger.tags = ["Message"]
  #swagger.security = [{
    "bearerAuth" : []
  }]
*/
);
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
router.post("/media/upload-single", [auth_middleware_1.default, media_middleware_1.default.single("file")], media_controller_1.default.single);
router.delete("/media/remove", [auth_middleware_1.default], media_controller_1.default.remove);
//////////////////////////////////////////////////////////////////////////////////////
exports.default = router;
//# sourceMappingURL=api.js.map