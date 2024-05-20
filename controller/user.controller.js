const { User } = require("../db/models");
const { sendResponse } = require("../helper");
const { HttpStatus } = require("../helper/enum");
const { Message } = require("../helper/localization");

module.exports = {
  findAll: async (req, res) => {
    try {
      const user = await User.findAll();
      return sendResponse(
        res,
        HttpStatus?.SUCCESS_CODE,
        Message.GET_ALL_USERS,
        {
          user,
        }
      );
    } catch (error) {
      return sendResponse(
        res,
        HttpStatus?.BAD_REQUEST_STATUS_CODE,
        error?.message,
        false
      );
    }
  },
  findOne: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req?.params?.id } });

      if (!user) {
        return sendResponse(
          res,
          HttpStatus?.BAD_REQUEST_STATUS_CODE,
          Message.USER_NOT_FOUND,
          false
        );
      }

      return sendResponse(
        res,
        HttpStatus?.SUCCESS_CODE,
        Message?.USER_GET_SUCCESS,
        {
          user,
        }
      );
    } catch (error) {
      return sendResponse(
        res,
        HttpStatus?.BAD_REQUEST_STATUS_CODE,
        error?.message,
        false
      );
    }
  },
  update: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req?.params?.id } });

      if (!user) {
        return sendResponse(
          res,
          HttpStatus?.BAD_REQUEST_STATUS_CODE,
          Message.USER_NOT_FOUND,
          false
        );
      }

      const update = await User.update(req?.body, {
        where: { id: req?.params?.id },
      });

      return sendResponse(
        res,
        HttpStatus?.SUCCESS_CODE,
        Message?.USER_UPDATED,
        { update }
      );
    } catch (error) {
      return sendResponse(
        res,
        HttpStatus?.BAD_REQUEST_STATUS_CODE,
        error?.message,
        false
      );
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req?.params?.id } });

      if (!user) {
        return sendResponse(
          res,
          HttpStatus?.BAD_REQUEST_STATUS_CODE,
          Message.USER_NOT_FOUND,
          false
        );
      }

      const deleteUser = await User.destroy({
        where: {
          id: req?.params?.id,
        },
      });

      return sendResponse(
        res,
        HttpStatus?.SUCCESS_CODE,
        Message?.DELETE_USER,
        deleteUser
      );
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
