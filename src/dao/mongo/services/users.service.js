import {
  createUser,
  findOneUser,
  findUserByID,
  findUserByIDAndUpdate,
  findUsers,
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

export const findUserByIDAndUpdateService = (id, userUpdates) => {
  return findUserByIDAndUpdate(id,userUpdates);
}
