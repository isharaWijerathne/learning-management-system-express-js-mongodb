const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherController')

router.route("/")
    .post(teacherController.testfunc)



module.exports = router    