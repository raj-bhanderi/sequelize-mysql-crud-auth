const { User } = require("../db/models");
const { sendResponse, generateToken, bcryptPassword } = require("../helper");
const { HttpStatus } = require("../helper/enum");
const { Message } = require("../helper/localization");
const bcrypt = require("bcrypt");

module.exports = {
  signUp: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req?.body?.email } });

      if (user) {
        return sendResponse(
          res,
          HttpStatus?.BAD_REQUEST_STATUS_CODE,
          Message.USER_ALREADY_REGISTER,
          false
        );
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcryptPassword(req?.body?.password,salt);
      const created = await User.create({
        ...req?.body,
        salt,
        password: hashedPassword,
      });

      const autoToken = await generateToken({
        userId: created?.id,
        email: created?.email,
      });

      return sendResponse(res, HttpStatus?.SUCCESS_CODE, Message.USER_SIGNUP, {
        autoToken,
      });
    } catch (error) {
      return sendResponse(
        res,
        HttpStatus?.BAD_REQUEST_STATUS_CODE,
        error?.message,
        false
      );
    }
  },
  signIn: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req?.body?.email } });

      if (!user) {
        return sendResponse(
          res,
          HttpStatus?.BAD_REQUEST_STATUS_CODE,
          Message.USER_NOT_FOUND,
          false
        );
      }
      const isMatch = await bcrypt.compare(req?.body?.password,user?.password) 
      if (!isMatch) {
        return sendResponse(
          res,
          HttpStatus?.BAD_REQUEST_STATUS_CODE,
          Message.INVALID_EMAIL_PASSWORD,
          false
        );
      }

      const autoToken = await generateToken({
        userId: user?.id,
        email: user?.email,
      });

      return sendResponse(res, HttpStatus?.CREATE_CODE, Message.USER_LOGIN, {
        autoToken,
      });
    } catch (error) {
      return sendResponse(
        res,
        HttpStatus?.BAD_REQUEST_STATUS_CODE,
        error?.message,
        false
      );
    }
  },
};
