var express = require('express');
const { allocateRoom, availableRooms,allRooms,allAvailableRooms,getStudentInRoomById } = require('../controllers/rector.controller');
var router = express.Router();
var {addNewRoom,getAllPendingStudentDetails ,getStudentDetailsById,getAllStudentDetails ,editStudentDetails }  = require('../controllers/student.controller')
var verifyToken = require('../middleware/verifyToken')
var isAdmin = require('../middleware/isAdmin')


router.get('/admin/student',verifyToken,isAdmin,getAllStudentDetails)
router.get('/admin/student/pending',verifyToken,isAdmin,getAllPendingStudentDetails)
router.get('/admin/student/:id',verifyToken,isAdmin,getStudentDetailsById)
router.patch('/admin/student',verifyToken,isAdmin,editStudentDetails);
router.post('/admin/room',verifyToken,isAdmin,addNewRoom);
router.get('/admin/room',verifyToken,isAdmin,allAvailableRooms)
router.get('/admin/allroom',verifyToken,isAdmin,allRooms)
router.get('/admin/room/:roomId',verifyToken,isAdmin,getStudentInRoomById)
router.get('/admin/availableroom/:id',verifyToken,isAdmin,availableRooms);
router.post('/admin/allocateroom/:studentid/:roomid',verifyToken,isAdmin,allocateRoom);

module.exports = router;
