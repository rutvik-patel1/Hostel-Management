var express = require('express')
var router = express.Router()
var verifyToken = require('../middleware/verifyToken')
var { login,register,logout } = require('../controllers/auth.controller') 

router.post('/auth/login',login)
router.post('/auth/signup',register)
router.post('/auth/logout',verifyToken,logout)

module.exports = router