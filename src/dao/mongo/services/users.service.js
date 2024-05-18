import {
  createUser,
  deleteInactiveUsers,
  deleteUser,
  findOneUser,
  findUserByID,
  findUserByIDAndUpdate,
  findUsers,
  getAllUsers,
  updateUserDocuments,
  updateUserRole,
} from "../persistence/users.mongo.js";

export const findOneUserService = (filter) => {
  return findOneUser(filter);
};

export const createUserService = (user) => {
  return createUser(user);
};

export const findUserByIDService = (id) => {
  return findUserByID(id);
};

export const findUsersService = () => {
  return findUsers();
};

export const updateUserRoleService = (id) => {
  return updateUserRole(id);
};

export const findUserByIDAndUpdateService = (id, userUpdates) => {
  return findUserByIDAndUpdate(id, userUpdates);
};

export const updateUserDocumentsService = (id, userData) => {
  return updateUserDocuments(id, userData);
};

export const getAllUsersService = () => {
  return getAllUsers();
};

export const deleteInactiveUsersService = () => {
  return deleteInactiveUsers();
};

export const deleteUserService = (id) => {
  return deleteUser(id);
};
