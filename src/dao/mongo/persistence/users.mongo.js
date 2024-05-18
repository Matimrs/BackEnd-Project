import { userModel } from "../models/user.model.js";
import { sendDeletionEmail } from "../../../config/mailer.config.js";

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

export const getAllUsers = async () => {
  return await userModel.find();
};

export const deleteInactiveUsers = async () => {
  const thresholdDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

  const inactiveUsers = await userModel.find({
    last_connection: { $lt: thresholdDate },
  });

  for (const user of inactiveUsers) {
    await sendDeletionEmail(user.email, user.first_name);
    await userModel.findByIdAndDelete(user._id);
  }

  return inactiveUsers.length;
};

export const deleteUser = async (id) => {
  return await userModel.findByIdAndDelete(id);
};
