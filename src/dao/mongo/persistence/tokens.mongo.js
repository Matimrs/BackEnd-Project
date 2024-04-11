import { tokenModel } from "../models/token.model.js";

export const findOneToken = async (option) => {
    return await tokenModel.findOne(option);
}

export const createOneToken = async (newToken) => {
    return await tokenModel.create(newToken);
}

export const findOneTokenAndUpdate = async (objectId, updates) => {
    return await tokenModel.findOneAndUpdate(objectId,updates);
}