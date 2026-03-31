import { Request, Response } from "express";
import { IReqUser } from "../types/user";
import ConversationModel from "../models/conversation.model";
import response from "../utils/response";

const conversationController = {
    async findAll(req:IReqUser, res:Response) {
        try {
            const userId = req.user?.id;
            if(!userId) return response.unauthorize(res);
    
            const result = await ConversationModel.find({participants: {$in : [userId]}}).populate("participants", "fullName avatar").populate("lastMessage.senderId", "fullName").sort({updatedAt: -1});

            response.success(res, result, "success to find all conversation");

        } catch(error) {
            response.error(res, null, "failed to find all conversations")
        }        
    },

    async findById(req:IReqUser, res:Response) {
        try {
            const userId = req.user?.id;
            if(!userId) return response.unauthorize(res);

            const id = req.params;
    
            const result = await ConversationModel.findById(id);

            if(!result) return response.notFound(res, "conversation by id not found");

            response.success(res, result, "success to find a conversation");

        } catch(error) {
            response.error(res, null, "failed to find a conversations")
        }        
    }
}

export default conversationController;