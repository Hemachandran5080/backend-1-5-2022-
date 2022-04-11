const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  getTechnicians,
  updateUser,
  deleteUser,
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.emailID, (err, results) => {
      if (err) {
        console.log(err);
      } else if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results[0].PasswordENC);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.TOKEN_KEY, {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          username: results[0].FirstName,
          role: results[0].Role,
          client_ID: results[0].Client_ID,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateUsers: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
  getTechnicians: (req, res) => {
    const role = req.params.role;
    getTechnicians(role, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};
