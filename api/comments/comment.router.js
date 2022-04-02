const {
  createComment,
  getComments,
  getCommentByJobId,
  getCommentByCommentId,
} = require("./comment.controller");
const commentRouter = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

commentRouter.post("/", checkToken, createComment);
commentRouter.get("/", checkToken, getComments);
commentRouter.get("/job/:id", checkToken, getCommentByJobId);
commentRouter.get("/comment/:id", checkToken, getCommentByCommentId);

module.exports = commentRouter;
