var express = require('express');
const { allocateRoom, availableRooms } = require('../controllers/rector.controller');
var router = express.Router();
var {uploadStudentDetails,addNewRoom,getStudentDetails,getDetails ,getStudentDetailsById ,editStudentDetails }  = require('../controllers/student.controller')
var verifyToken = require('../middleware/verifyToken')
var isAdmin = require('../middleware/isAdmin')


router.get('/student',verifyToken,getStudentDetails)
router.get('/details',verifyToken,getDetails)
router.get('/student/:id',verifyToken,getStudentDetailsById)
router.post('/student',verifyToken,uploadStudentDetails);
router.patch('/student',verifyToken,editStudentDetails);
// router.post('/room',verifyToken,isAdmin,addNewRoom);
// router.get('/availableroom/:id',verifyToken,isAdmin,availableRooms);
// router.post('/allocateroom/:studentid/:roomid',verifyToken,isAdmin,allocateRoom);

module.exports = router;
