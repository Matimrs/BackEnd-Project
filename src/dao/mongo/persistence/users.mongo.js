import { userModel } from "../models/user.model.js";

export const findOneUser = async (filter) => {
    return await userModel.findOne(filter);
}

export const createUser = async (user) => {
    return await userModel.create(user);
}

export const findUserByID = async (id) => {
    return await userModel.findById(id);
}

export const findUsers = async () => {
    return await userModel.find().lean();
}