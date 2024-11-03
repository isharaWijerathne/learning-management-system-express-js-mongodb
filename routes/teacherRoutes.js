const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherController')

router.route("/")
    .get(teacherController.test)



module.exports = router    