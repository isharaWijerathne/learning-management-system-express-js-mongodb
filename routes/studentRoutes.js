const express = require('express');
const router = express.Router();

const studentController = require("../controllers/studentController");

router.route("/").
    post(studentController.createStundet);


router.route("/edit").
    post(studentController.editStudent);


router.route("/active/:studentId").
    get(studentController.activeStudent);


router.route("/deactive/:studentId").
    get(studentController.deactivateStudent);



module.exports = router