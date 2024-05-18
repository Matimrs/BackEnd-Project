import { userModel } from "../models/user.model.js";

export const findOneUser = async (filter) => {
  return await userModel.findOne(filter);
};

export const createUser = async (user) => {
  return await userModel.create(user);
};

export const findUserByID = async (id) => {
  return await userModel.findById(id);
};

export const findUsers = async () => {
  return await userModel.find().lean();
};

export const updateUserRole = async (uid) => {
  const user = await userModel.findById(uid);
  const newRole = user.role === "user" ? "premium" : "user";
  user.role = newRole;
  user.save();
  return user;
};

export const findUserByIDAndUpdate = async (id, userUpdates) => {
  return await userModel.findByIdAndUpdate(id, userUpdates);
};

export const updateUserDocuments = async (id, userData) => {
  return await userModel.findByIdAndUpdate(id, userData, { new: true });
};
