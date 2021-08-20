const router = require('express').Router()
const { login, register } = require('../controllers/authController')
const { body } = require('express-validator')
const { validate } = require('../validators')
const { rules: registrationRules } = require('../validators/auth/register')
const { rules: loginRules } = require('../validators/auth/login')

router.post('/login', [loginRules(), validate], login)

router.post('/register', [registrationRules(), validate], register)


module.exports = router