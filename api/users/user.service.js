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
      `select UserID, FirstName, LastName, EmailID, PhoneNumber from users`,
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
      `select UserID, FirstName, LastName, EmailID, PhoneNumber from users where UserID = ?`,
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
      `update users set FirstName=?, LastName=?, EmailID=?, password=?, PhoneNumber=? where UserID = ?`,
      [
        data.first_name,
        data.last_name,
        data.emailid,
        data.password,
        data.number,
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
      `select * from users where EmailID = ?`,
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
};
