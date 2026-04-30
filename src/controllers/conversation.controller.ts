import { Request, Response } from "express";
import { IReqUser } from "../types/user";
import ConversationModel from "../models/conversation.model";
import response from "../utils/response";
import { isValidObjectId } from "mongoose";

const conversationController = {
    async findAll(req:IReqUser, res:Response) {
        try {
            const userId = req.user?.id;
            if(!userId) return response.unauthorize(res);
    
            const result = await ConversationModel.find({participants: {$in : [userId]}}).populate("participants", "userName avatar").populate("lastMessage.senderId", "fullName").sort({updatedAt: -1});

            response.success(res, result, "success to find all conversation");

        } catch(error) {
            response.error(res, null, "failed to find all conversations")
        }        
    },

    async findById(req:IReqUser, res:Response) {
        try {
            const userId = req.user?.id;
            if(!userId) return response.unauthorize(res);

            const {id} = req.params;
    
            const result = await ConversationModel.findOne({_id: id}).populate("participants", "fullName userName avatar");

            if(!result) return response.notFound(res, "conversation by id not found");

            response.success(res, result, "success to find a conversation");

        } catch(error) {
            response.error(res, null, "failed to find a conversations")
        }        
    },

    async findByParticipants(req: IReqUser, res:Response) {
        try {
            const userId = req.user?.id;
            const {targetId} = req.params;

            if(!isValidObjectId(userId) || !isValidObjectId(targetId)) {
                return response.error(res, null, "participants is not found");
            }

            const sameId = userId === targetId;
            if(sameId) return response.error(res, null, "id is same");

            const result = await ConversationModel.findOne({
                participants: {
                    $all: [userId, targetId]
                }
            });

            response.success(res, result, "success to find a conversation by participants");

        } catch(error) {
            response.error(res, null, "failed to find a conversations by participants")
        }
    }
}

export default conversationController;