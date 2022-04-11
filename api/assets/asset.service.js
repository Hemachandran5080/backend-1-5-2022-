const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into assets(Asset_ID, Asset_Name, Asset_Model, Client_ID, Asset_Location, Refrigerate_Type, Warranty, Status) values(?,?,?,?,?,?,?,?)`,
      [
        data.asset_id,
        data.asset_name,
        data.asset_model,
        data.client_id,
        data.asset_location,
        data.refrigerate_type,
        data.warranty,
        data.asset_status,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAssets: (callBack) => {
    pool.query(
      `select * from assets INNER JOIN clients ON assets.Client_ID = clients.Client_ID`,
      [],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAssetByAssetId: (id, callBack) => {
    pool.query(
      `select * from assets INNER JOIN clients ON assets.Client_ID = clients.Client_ID where Asset_ID = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateAssets: (data, callBack) => {
    pool.query(
      `update assets set Asset_Name=?, Asset_Model=?, Asset_Location=?, Refrigerate_Type=?, Warranty=?, Status=? where Asset_ID = ?`,
      [
        data.asset_name,
        data.asset_model,
        data.asset_location,
        data.refrigerate_type,
        data.warranty,
        data.status,
        data.asset_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
