const {
  createJob,
  getJobs,
  getJobByJobId,
  updateJobs,
} = require("./job.controller");

const jobRouter = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

jobRouter.post("/", checkToken, createJob);
jobRouter.get("/", checkToken, getJobs);
jobRouter.get("/:id", checkToken, getJobByJobId);
jobRouter.patch("/", checkToken, updateJobs);

module.exports = jobRouter;
