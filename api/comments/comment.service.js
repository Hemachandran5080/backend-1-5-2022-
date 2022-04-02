const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into comments(Comment_ID, Comment, Job_ID, Created_Time) values(?,?,?,?)`,
      [data.comment_id, data.comment, data.job_id, data.created_time],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getComments: (callBack) => {
    pool.query(`select * from comments`, [], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getCommentByCommentId: (id, callBack) => {
    pool.query(
      `select * from comments where Comment_ID = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getCommentByJobId: (id, callBack) => {
    pool.query(
      `select * from comments INNER JOIN jobs ON comments.Job_ID = jobs.Job_ID where comments.Job_ID = ?`,
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
