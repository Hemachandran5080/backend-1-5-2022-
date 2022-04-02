const {
  createUser,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  login,
} = require("./user.controller");

const userRouter = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

userRouter.post("/", checkToken, createUser);
userRouter.get("/", checkToken, getUsers);
userRouter.get("/:id", checkToken, getUserByUserId);
userRouter.patch("/", checkToken, updateUsers);
userRouter.delete("/", checkToken, deleteUser);
userRouter.post("/login", login);

module.exports = userRouter;
