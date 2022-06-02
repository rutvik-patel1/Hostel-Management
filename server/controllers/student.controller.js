const Student = require("../models/student.model");
const Room = require("../models/room.model");
const User = require('../models/user.model')
const uploadStudentDetails = (req, res) => {
  try { console.log("===>",req.body)
    let { fullname, email, mobile, address, passingMonth, passingYear } =
      req.body;
    // console.log(fullname, email, mobile, address, passingMonth, passingYear);
    if (
      !fullname ||
      !email ||
      !mobile ||
      !address ||
      !passingMonth ||
      !passingYear
    ) {
      return res.status(400).json({ message: "please resent data properly" });
    }
    const student = {
      fullname: req.body.fullname,
      email: req.body.email,
      address: req.body.address,
      mobile: req.body.mobile,
      passingMonth: req.body.passingMonth,
      passingYear: req.body.passingYear,
    };
    Student.create(student)
      .then((result) => {
        return res.json({ message: "post successfully" });
      })
      .catch((err) => res.json({ message: err.message }));
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const addNewRoom = async (req, res) => {
  try {
     console.log(req.body);
    const { hostelNumber, floorNumber, roomNumber } = req.body;
    const newRoom = {
      roomNo: hostelNumber.toString() + floorNumber + roomNumber,
      totalShring: req.body.totalSharing,
    };

    try {
      await Room.create(newRoom);
      return res.json({ message: "data added successfully" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const getStudentDetails = async (req, res) => {
  try {
    console.log("req.useremail",req.useremail)
    const student = await Student.findOne({
      where: { email: req.useremail },
    });
    // console.log("student",student)
    if (!student) {

      return res.status(200).json({ data:[] });
    } else {
    
      return res.status(200).json({ data: student });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getDetails = async (req, res) => {
  try {
    console.log("req.useremail",req.useremail)
    const student = await User.findOne({
      where: { email: req.useremail },
    });
    // console.log("student",student)
    if (!student) {
     
      return res.status(200).json({ data:[] });
    } else {
        const { email,role } = student
        const result = { email:email , role:role }
      return res.status(200).json({ data: result });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getAllStudentDetails = async (req, res) => {
  try {
    console.log("req.useremail",req.useremail)
    const student = await Student.findAll();
    // console.log("student",student)
    if (!student) {
      return res.status(200).json({ data:[] });
    } else {
    
      return res.status(200).json({ data: student });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getStudentDetailsById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ where: { id: studentId } });
    if (student) {
      return res.json({ data: student });
    } else {
      return res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const editStudentDetails = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { email: req.useremail },
    });
    if (student) {
      // fullname, email, mobile, address, passingMonth, passingYear
      if (req.body.fullname) {
        student.fullname = req.body.fullname;
      }
      if (req.body.mobile) {
        student.mobile = req.body.mobile;
      }
      if (req.body.address) {
        student.address = req.body.address;
      }

      try {
        await student.save();
        return res.json({
          message: "data updated successfully",
          data: student,
        });
      } catch (error) {
        return res.status(404).json({ error: error.message });
      }
    } else {
      return res.status(404).json({ error: "data not found" });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getAllPendingStudentDetails = async (req, res) => {
  try {
    // console.log("req.useremail",req.useremail)
    const student = await Student.findAll({ where: { roomNumber : 0 } });
    // console.log("student",student)
    if (!student) {
      return res.status(200).json({ data:[] });
    } else {
      return res.status(200).json({ data: student });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getAllPendingStudentDetails,
  uploadStudentDetails,
  addNewRoom,
  getStudentDetails,
  getAllStudentDetails,
  getStudentDetailsById,
  editStudentDetails,
  getDetails
};
