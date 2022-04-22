const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(FirstName, LastName, Role, EmailID, PasswordENC, PhoneNumber, Client_ID, status) values(?,?,?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.role,
        data.emailid,
        data.password,
        data.number,
        data.clientid,
        data.status,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `select ut.UserID, ut.FirstName, ut.LastName, ut.Role, ut.EmailID, ut.PhoneNumber, ut.status, ut.Client_ID, ct.Client_Name, ct.Client_Address, ct.Client_Contact, ct.Client_Status from users ut
		INNER JOIN clients ct ON ut.Client_ID = ct.Client_ID;`,
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
  getUserCount: (callBack) => {
    pool.query(
      `select COUNT(*) 'total_count', COUNT(IF(Role = 'admin', 1, NULL)) 'Admin', COUNT(IF(Role = 'supervisor', 1, NULL)) 'Supervisor', COUNT(IF(Role = 'technician', 1, NULL)) 'Technician' from prengineers.users;`,
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
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select ut.UserID, ut.FirstName, ut.LastName, ut.Role, ut.EmailID, ut.PhoneNumber, ut.status, ut.Client_ID, ct.Client_Name, ct.Client_Address, ct.Client_Contact, ct.Client_Status from users ut
		INNER JOIN clients ct ON ut.Client_ID = ct.Client_ID where ut.UserID = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update users set FirstName=?, LastName=?, Role=?, Client_ID=?, EmailID=?, PhoneNumber=?, status=? where UserID = ?`,
      [
        data.first_name,
        data.last_name,
        data.role,
        data.clientid,
        data.emailid,
        data.number,
        data.status,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from users where UserID = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (EmailID, callBack) => {
    pool.query(
      `select * from users ut INNER JOIN clients ct ON ut.Client_ID = ct.Client_ID where ut.EmailID = ?`,
      [EmailID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results);
        return callBack(null, results);
      }
    );
  },
  getTechnicians: (role, callBack) => {
    pool.query(
      `select ut.UserID, ut.FirstName, ut.LastName, ut.Role, ut.EmailID, ut.PhoneNumber, ut.status, ut.Client_ID, ct.Client_Name, ct.Client_Address, ct.Client_Contact, ct.Client_Status from users ut
		INNER JOIN clients ct ON ut.Client_ID = ct.Client_ID where ut.Role=?`,
      [role],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
