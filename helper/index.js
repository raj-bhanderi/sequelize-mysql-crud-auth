const jwt = require("jsonwebtoken");
const { Action } = require("../helper/localization");
const ACCESS_TOKEN_EXPIRES_IN = "30d";
const bcrypt = require("bcrypt");
const moment = require("moment");
const userSchema = require("../db/models/user");
const { createHmac } = require("crypto");

module.exports = {
  sendResponse(res, status, message, payload) {
    return res.status(status).send(prepareResponse(status, message, payload));
  },
  response: function (internalCode, message, data) {
    if (data != null || data != undefined) {
      return {
        responseCode: internalCode,
        responseMessage: message,
        responseData: data,
      };
    }
    return {
      responseCode: internalCode,
      responseMessage: message,
    };
  },
  generateToken: async function (user) {
    let token = await jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      algorithm: process.env.JWT_ALGORITHM,
    });
    return token;
  },
  bcryptPassword: async function (password, salt) {
    var Password = await bcrypt.hash(password, salt);
    return Password;
  },
  verifyJwt: function (token) {
    try {
      let tokenData = jwt.verify(token, process.env.JWT_SECRET);
      if (tokenData && this.getCurrentTimeStampUnix() > tokenData.exp) {
        return {
          isValid: false,
          reason: "expired",
        };
      } else if (tokenData && this.getCurrentTimeStampUnix() < tokenData.exp) {
        return {
          isValid: true,
          ...tokenData,
        };
      } else {
        return {
          isValid: false,
          reason: "invalid",
        };
      }
    } catch (err) {
      return {
        isValid: false,
        reason: "invalid",
      };
    }
  },
  getCurrentTimeStampUnix: function () {
    return moment().unix();
  },
  getUserById: async function getUserById(userId) {
    return await userSchema.findById(userId);
  },
  createUserInputError : function (message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.name = "UserInputError";
    return error;
  }
};

function prepareResponse(status, message, data) {
  if (data != null || data != undefined) {
    return {
      responseCode: status,
      responseMessage: message,
      responseData: data,
    };
  }
  return {
    responseCode: status,
    responseMessage: message,
  };
}
