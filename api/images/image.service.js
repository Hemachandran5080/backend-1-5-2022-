const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into images(img_id, job_id, image) values(?,?,?)`,
      [data.img_id, data.job_id, data.image],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getImages: (callBack) => {
    pool.query(`select * from images`, [], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getImageByJobId: (id, callBack) => {
    pool.query(
      `select it.image from images it INNER JOIN jobs jt ON it.job_id == jt.Job_ID where jt.Job_ID = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
