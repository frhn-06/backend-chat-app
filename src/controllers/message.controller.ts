import { Request , Response} from "express";
import { IReqUser } from "../types/user";
import response from "../utils/response";
import MessageModel, { IMessageForm, messageDTO } from "../models/message.model";
import ConversationModel from "../models/conversation.model";
import mongoose, { isValidObjectId } from "mongoose";

const messageController = {
    async create(req: IReqUser, res:Response) {
        try {
            const userId = req.user?.id;

            if(!userId) return response.unauthorize(res);

            const {targetId, text, image} = req.body;

            if(!isValidObjectId(targetId)) return response.notFound(res, "target is not found");

            
            await messageDTO.validate({targetId, ...(text && {text}), ...(image && {image})});
            
            const senderObjectId = new mongoose.Types.ObjectId(userId);
            const targetObjectId = new mongoose.Types.ObjectId(targetId);

            let conversation = await ConversationModel.findOne({
                participants: {$in : [senderObjectId, targetObjectId]}
            });

            if(!conversation) {
                conversation = await ConversationModel.create({participants: [senderObjectId, targetObjectId]})
            }

            

            const result = await MessageModel.create({conversationId: conversation._id, senderId: senderObjectId, text: text, image: image})

            await ConversationModel.findByIdAndUpdate(conversation._id, {
                lastMessage: {
                    text: text,
                    senderId: senderObjectId
                }
            })

            
            response.success(res, result, "success to create message")
            


        } catch (error) {
            return response.error(res, null, "failed to create message");
        }
    },


    async findByConversation(req:IReqUser, res:Response) {
        try{
            const userId = req.user?.id;
            if(!userId) return response.unauthorize(res);

            const userObjectId = new mongoose.Types.ObjectId(userId);

            const {conversationId} = req.params;

            if(!isValidObjectId(conversationId)) return response.notFound(res, "message not found");

            const conversationObjectId = new mongoose.Types.ObjectId(`${conversationId}`);

            const conversation = await ConversationModel.findOne({_id: conversationObjectId, participants: {$in: [userObjectId]}});

            if(!conversation) return response.notFound(res, "conversation not found");

            const result = await MessageModel.find({conversationId: conversationObjectId}).sort({createdAt: 1}).exec();

            

            response.success(res, result, "success to find message by conversation");
        } catch(error) {
            return response.error(res, null, "failed to find messae by conversation");
        }
    }
}

export default messageController;