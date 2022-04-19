const {
  createJob,
  getJobs,
  getJobByJobId,
  updateJobs,
  getJobCount,
} = require("./job.controller");

const jobRouter = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

jobRouter.post("/", checkToken, createJob);
jobRouter.get("/", checkToken, getJobs);
jobRouter.get("/:id", checkToken, getJobByJobId);
jobRouter.get("/job/count", checkToken, getJobCount);
jobRouter.patch("/", checkToken, updateJobs);

module.exports = jobRouter;
