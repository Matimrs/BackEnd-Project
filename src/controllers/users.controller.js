import {
  deleteInactiveUsersService,
  deleteUserService,
  findUserByIDService,
  getAllUsersService,
  updateUserDocumentsService,
  updateUserRoleService,
} from "../dao/mongo/services/users.service.js";

export const putUserRole = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await findUserByIDService(uid);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    /*const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
    const userDocuments = user.documents.map(doc => doc.name);

    const hasAllDocuments = requiredDocuments.every(doc => userDocuments.includes(doc));

    if (!hasAllDocuments && user.role === "user") {
      return res.status(400).send({ message: "User has not uploaded all required documents" });
    }
    */
    const updatedUser = updateUserRoleService(uid);

    res.send({ message: "Role updated" });
  } catch (error) {
    req.logger.error(error);

    console.error(error);

    res.status(500).send({ message: "Role not updated" });
  }
};

export const postUpdateUserDocuments = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await findUserByIDService(uid);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const files = req.files.map((file) => ({
      name: file.originalname,
      reference: file.path,
    }));

    user.documents = user.documents.concat(files);

    await updateUserDocumentsService(uid, user);

    res.status(200).send({ message: "Documents uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    const filteredUsers = users.map((e) => {
      return {
        nombre: e.nombre,
        email: e.email,
        role: e.role,
      };
    });

    res.send({ users: filteredUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteAllInactiveUsers = async (req, res) => {
  try {
    const deletedCount = await deleteInactiveUsersService();

    res.send({ message: `${deletedCount} users deleted due to inactivity` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const deleteOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserService(id);

    if(!deletedUser) res.status(404).send({message: 'User not found'})

    res.send({ message: "User successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
