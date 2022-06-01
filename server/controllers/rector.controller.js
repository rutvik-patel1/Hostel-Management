const Student = require("../models/student.model");
const Room = require("../models/room.model");
const { Op } = require("sequelize");

const getStudentInRoomById = async (req, res) => {
    try {
      const id = req.params.roomId;
      console.log(id)
      const student = await Student.findAll({ where :{ roomNumber : id } })
      
      if(student){
         return res.status(200).json({ data : student})
      }
      else{
        return res.status(404).json({ data:[] , message:"data not found!!" })
      }
    } catch (error) {
      return res.status(404).json({ data:[] , message:error.message })
    }
}

const allocateRoom = async (req, res) => {
  try {
    const studentId = req.params.studentid;
    const roomId = req.params.roomid;
    if (studentId && roomId) {
      const student = await Student.findOne({ where: { id: studentId } });
      const room = await Room.findOne({
        where: {
          roomNo: roomId,
          avilableSpace: {
            [Op.and]: {
              [Op.gte]: 0,
              [Op.lt]: {
                [Op.col]: "Room.totalShring",
              },
            },
          },
        },
        returning: true,
      });
      if (student && room) {
        try {
          student.roomNumber = room.roomNo;
          await student.save();
          await room.increment({ avilableSpace: 1 });
          await room.reload();
          return res.json({
            message: "succeffully allocated",
            data: student,
            room: room,
          });
        } catch (error) {
          return res.json({ error: error.message });
        }
      } else {
        return res.json({ error: "user or room not found" });
      }
    } else {
      return res.json({ error: "Invalid parameter" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const availableRooms = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (studentId) {
      const student = Student.findOne({ where: { id: studentId } });
      const room = await Room.findAll({
        where: {
          avilableSpace: {
            [Op.and]: {
              [Op.gte]: 0,
              [Op.lt]: {
                [Op.col]: "Room.totalShring",
              },
            },
          },
        },
      });
      if (student && room) {
        return res.json({
          message: "success",
          total_availabe_roon: room.length,
          data: room,
        });
      } else {
        return res.json({ error: "user not found or room not avilable" });
      }
    } else {
      return res.json({ error: "Invalid parameter" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const allRooms = async (req, res) => {
  try {
    
    // {
    //   where: {
    //     avilableSpace: {
    //       [Op.and]: {
    //         [Op.gte]: 0,
    //         [Op.lt]: {
    //           [Op.col]: "Room.totalShring",
    //         },
    //       },
    //     },
    //   },
    // }

      const room = await Room.findAll();
      if (room) {
        return res.status(200).json({
          message: "success",
          total_availabe_room: room.length,
          data: room,
        });
      } else {
        return res.status(404).json({ error: "room not avilable" });
      }
    
  } catch (error) {
    return res.json({ error: error.message });
  }
};


const allAvailableRooms = async (req, res) => {
  try {
    
      const room = await Room.findAll({
        where: {
          avilableSpace: {
            [Op.and]: {
              [Op.gte]: 0,
              [Op.lt]: {
                [Op.col]: "Room.totalShring",
              },
            },
          },
        },
      });
      if (room) {
        return res.status(200).json({
          message: "success",
          total_availabe_room: room.length,
          data: room,
        });
      } else {
        return res.status(404).json({ error: "room not avilable" });
      }
    
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = { allRooms ,allocateRoom, availableRooms ,allAvailableRooms , getStudentInRoomById};
