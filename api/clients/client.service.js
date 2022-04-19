const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into clients(Client_Name, Client_Address, Client_Contact, Client_Status) values(?,?,?,?)`,
      [data.clientname, data.clientaddr, data.clientcontact, data.clientstatus],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getClients: (callBack) => {
    pool.query(`select * from clients`, [], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getClientCount: (callBack) => {
    pool.query(
      `select COUNT(*) 'total_count', COUNT(IF(Client_Status = 'active', 1, NULL)) 'Active', COUNT(IF(Client_Status = 'inactive', 1, NULL)) 'Inactive' from clients`,
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
  getClientByClientId: (id, callBack) => {
    pool.query(
      `select Client_ID, Client_Name, Client_Address, Client_Contact, Client_Status from clients where Client_ID = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateClients: (data, callBack) => {
    pool.query(
      `update clients set Client_Name=?, Client_Address=?, Client_Contact=?, Client_Status=? where Client_ID = ?`,
      [
        data.clientname,
        data.clientaddr,
        data.clientcontact,
        data.clientstatus,
        data.clientid,
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
