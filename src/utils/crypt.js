import { hash, compare } from "bcrypt";

export const hashing = async (password) => {
  try {
    const hashedPassword = hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    return null;
  }

};

export const passwordValidation = async (password, hashedPassword) => {
    try {
        return await compare(password, hashedPassword);
    } catch (error) {
        console.error(error);
        return false;
    }
};
