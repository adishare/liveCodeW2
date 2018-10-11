var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController.js')

router.post('/users/register',UserController.create)
router.post('/users/login',UserController.login)

router.use('/events',require('./EventRoutes.js'))



module.exports = router