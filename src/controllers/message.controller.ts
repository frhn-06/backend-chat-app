import { Request , Response} from "express";
import { IReqUser } from "../types/user";
import response from "../utils/response";
import MessageModel, { IMessageForm, messageDTO } from "../models/message.model";
import ConversationModel from "../models/conversation.model";
import mongoose, { isValidObjectId } from "mongoose";
import db from "../utils/db";


import {io, users} from '../socket';

const messageController = {
    async create(req: IReqUser, res:Response) {
        try {
            await db();
            console.log("db okee");

            const userId = req.user?.id;

            if(!userId) return response.unauthorize(res);

            const {targetId, text, image} = req.body;

            if(!isValidObjectId(targetId)) return response.notFound(res, "target is not found");

            
            await messageDTO.validate({targetId, ...(text && {text}), ...(image && {image})});
            
            const senderObjectId = new mongoose.Types.ObjectId(userId);
            const targetObjectId = new mongoose.Types.ObjectId(targetId);

            let conversation = await ConversationModel.findOne({
                participants: {$all : [senderObjectId, targetObjectId]}
            });

            if(!conversation) {
                conversation = await ConversationModel.create({participants: [senderObjectId, targetObjectId]})
            }

            

            const result = await MessageModel.create({conversationId: conversation._id, senderId: senderObjectId, text: text, image: image})
            
            const newConversation = await ConversationModel.findByIdAndUpdate(conversation._id, {
                lastMessage: {
                    text: text,
                    senderId: senderObjectId
                }
            },{
                new: true
            }).populate("participants", "userName avatar").exec();
            
            const receiverId = targetObjectId.toString();
            const userStringId = userId.toString();  
            const socketTargetId = users[receiverId];
            const socketUserId = users[userStringId]
            
            if(socketTargetId) {
                io.to(socketTargetId).emit("newMessage", result)
                
            }

            if(socketTargetId && socketUserId) {
                io.to(socketTargetId).emit("newConversation", newConversation);
                io.to(socketUserId).emit("newConversation", newConversation);
            }


            
            response.success(res, result, "success to create message")
            


        } catch (error) {
            return response.error(res, error, "failed to create message");
        }
    },

    async findByTargetId(req:IReqUser, res:Response) {
        try {
            await db();
            console.log("db okee");

            const userId = req.user?.id;
            const {targetId} = req.params;

            if(!(isValidObjectId(userId) && isValidObjectId(targetId))) {
                return response.notFound(res, "data id tidak ada");
            }

            let conversation = await ConversationModel.findOne({
                participants: {
                    $all: [userId, targetId]
                }
            })

            if(!conversation) {
                return response.success(res, {
                    conversationId: null,
                    messages: []
                }, "conversation masih koosng");
            }

            const result = await MessageModel.find({
                conversationId: conversation._id
            }).populate("senderId", "userName avatar").sort({createdAt: 1}).exec();

            

            response.success(res, {
                conversationId: conversation._id,
                messages: result
            }, "success to find message by targetId");
        }catch(error) {
            return response.error(res, error, "failed to find message by taretId");
        }
    },


    async findByConversation(req:IReqUser, res:Response) {
        try{
            await db();
            console.log("db okee");

            const userId = req.user?.id;
            if(!userId) return response.unauthorize(res);

            const userObjectId = new mongoose.Types.ObjectId(userId);

            const {conversationId} = req.params;

            if(!isValidObjectId(conversationId)) return response.notFound(res, "message not found");

            const conversationObjectId = new mongoose.Types.ObjectId(`${conversationId}`);

            const conversation = await ConversationModel.findOne({_id: conversationObjectId, participants: {$in: [userObjectId]}});

            if(!conversation) return response.notFound(res, "conversation not found");

            const result = await MessageModel.find({conversationId: conversationObjectId}).populate("senderId", "userName avatar").sort({createdAt: 1}).exec();

            

            response.success(res, result, "success to find message by conversation");
        } catch(error) {
            return response.error(res, error, "failed to find messae by conversation");
        }
    }
}

export default messageController;