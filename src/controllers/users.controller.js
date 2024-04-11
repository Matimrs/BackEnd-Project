import { updateUserRoleService } from "../dao/mongo/services/users.service.js";

export const putUserRole = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await updateUserRoleService(uid);

    res.send({ message: "Role updated" });
  } catch (error) {
    req.logger.error(error);

    res.status(404).send({ message: "Role not updated" });
  }
};
