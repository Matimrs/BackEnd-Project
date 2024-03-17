import { messageModel } from "../models/message.model.js";

export const findMessages = async () => {
    return await messageModel.find();
}

export const createMessage = async (message) => {
    return await messageModel.create(message);
}