const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherController')


router.route("/")
    .post(teacherController.createTeacher)


router.route("/edit")
    .post(teacherController.editTeacher);    


router.route("/active/:teacherId")
    .get(teacherController.activeTeacher);

    
router.route("/deactive/:teacherId")
    .get(teacherController.deactiveTeacher);

router.route("/passwordChange")
    .post(teacherController.passwordChange)





module.exports = router    