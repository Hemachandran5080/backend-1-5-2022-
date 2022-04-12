const pool = require("../../config/database");

var d = new Date();
d = new Date(d.getTime());
var date_format_str =
  d.getFullYear().toString() +
  "-" +
  ((d.getMonth() + 1).toString().length == 2
    ? (d.getMonth() + 1).toString()
    : "0" + (d.getMonth() + 1).toString()) +
  "-" +
  (d.getDate().toString().length == 2
    ? d.getDate().toString()
    : "0" + d.getDate().toString()) +
  " " +
  (d.getHours().toString().length == 2
    ? d.getHours().toString()
    : "0" + d.getHours().toString()) +
  ":" +
  ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2
    ? (parseInt(d.getMinutes() / 5) * 5).toString()
    : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) +
  ":00";
console.log(date_format_str);

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into comments(Comment_ID, Comment, Job_ID, Created_Time) values(?,?,?,?)`,
      [data.comment_id, data.comment, data.job_id, date_format_str],
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
