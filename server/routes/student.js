var express = require('express');
var router = express.Router();
var {uploadStudentDetails,getStudentDetails,getDetails ,getStudentDetailsById ,editStudentDetails }  = require('../controllers/student.controller')
var verifyToken = require('../middleware/verifyToken')


router.get('/student',verifyToken,getStudentDetails)
router.get('/details',verifyToken,getDetails)
router.get('/student/:id',verifyToken,getStudentDetailsById)
router.post('/student',verifyToken,uploadStudentDetails);
router.patch('/student',verifyToken,editStudentDetails);
// router.post('/room',verifyToken,isAdmin,addNewRoom);
// router.get('/availableroom/:id',verifyToken,isAdmin,availableRooms);
// router.post('/allocateroom/:studentid/:roomid',verifyToken,isAdmin,allocateRoom);

module.exports = router;
