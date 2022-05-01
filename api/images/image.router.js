const { createImage, getImages, getImageByJobId } = require("./job.controller");

const imageRouter = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

imageRouter.post("/", checkToken, createImage);
imageRouter.get("/", checkToken, getImages);
imageRouter.get("/:id", checkToken, getImageByJobId);

module.exports = imageRouter;
