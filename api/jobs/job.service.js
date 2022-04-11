const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into jobs(Job_ID, FClient_ID, UserID, Asset_ID, Job_Subject, Job_Description, Job_Type, Job_Status) values(?,?,?,?,?,?,?,?)`,
      [
        data.job_id,
        data.fclient_id,
        data.userid,
        data.asset_id,
        data.job_subject,
        data.job_description,
        data.job_type,
        data.job_status,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getJobs: (callBack) => {
    pool.query(
      `select jt.Job_ID, jt.FClient_ID, jt.UserID, jt.Job_Subject, jt.Job_Description, jt.Job_Type, jt.Job_Status,
         ut.UserID, ut.FirstName, ut.LastName, ut.Role, ut.PhoneNumber, ct.Client_ID, ct.Client_Name, ct.Client_Address, ct.Client_Contact from jobs jt
          INNER JOIN users ut ON jt.UserID = ut.UserID
          INNER JOIN clients ct ON jt.FClient_ID = ct.Client_ID`,
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
  getJobByJobId: (id, callBack) => {
    pool.query(
      `  select jt.Job_ID, jt.FClient_ID, jt.UserID, jt.Job_Subject, jt.Job_Description, jt.Job_Type, jt.Job_Status,
         ut.UserID, ut.FirstName, ut.LastName, ut.Role, ut.PhoneNumber, ct.Client_ID, ct.Client_Name, ct.Client_Address, ct.Client_Contact from jobs jt
          INNER JOIN users ut ON jt.UserID = ut.UserID
          INNER JOIN clients ct ON jt.FClient_ID = ct.Client_ID
        WHERE jt.Job_ID = ?`,

      //     select * from jobs
      //    INNER JOIN users ON jobs.UserID = users.UserID
      //    INNER JOIN clients ON users.Client_ID = clients.Client_ID
      //    WHERE jobs.Job_ID = ?
      [parseInt(id)],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateJobs: (data, callBack) => {
    pool.query(
      `update jobs set Job_Subject=?, Job_Description=?, Job_Type=?, Job_Status=? where Job_ID = ?`,
      [
        data.job_subject,
        data.job_description,
        data.job_type,
        data.job_status,
        data.job_id,
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
