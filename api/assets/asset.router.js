const {
  createAsset,
  getAssets,
  getAssetByAssetId,
  updateAssets,
} = require("./asset.controller");
const assetRouter = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

assetRouter.post("/", checkToken, createAsset);
assetRouter.get("/", checkToken, getAssets);
assetRouter.get("/:id", checkToken, getAssetByAssetId);
assetRouter.patch("/", checkToken, updateAssets);

module.exports = assetRouter;
