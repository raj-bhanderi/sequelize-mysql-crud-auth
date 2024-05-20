const express = require('express');
const { findAll,findOne,deleteUser,update} = require('../controller/user.controller');
const { validateUpdateUser } = require('../helper/validation');
const route = express()

route.get("/all",findAll)
route.get("/:id",findOne)
route.put("/:id",validateUpdateUser,update)
route.delete("/:id",deleteUser)

module.exports = route