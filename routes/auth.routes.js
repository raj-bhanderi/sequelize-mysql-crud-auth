const express = require('express');
const { signUp,signIn } = require('../controller/auth.controller');
const { validateSignUp, validateSignIn } = require('../helper/validation');
const route = express()

route.post("/sign-up",validateSignUp, signUp)
route.post("/sign-in",validateSignIn, signIn)

module.exports = route