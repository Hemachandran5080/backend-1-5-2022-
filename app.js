require("dotenv").config();
const express = require("express");
const userRouter = require("./api/users/user.router");
const clientRouter = require("./api/clients/client.router");
const jobRouter = require("./api/jobs/job.router");
const assetRouter = require("./api/assets/asset.router");
const commentRouter = require("./api/comments/comment.router");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

app.use("/api/clients", clientRouter);

app.use("/api/jobs", jobRouter);

app.use("/api/assets", assetRouter);

app.use("/api/comments", commentRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server running");
});
