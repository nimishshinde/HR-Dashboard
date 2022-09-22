const express = require("express");

const { LeaveModel } = require("../UserModel");
const { UserModel } = require("../UserModel");

const adminRouter = express.Router();

// Gives all leaves
adminRouter.route("/leave").get(allLeaves);

// Creates a new Leave
adminRouter.route("/leave").post(addLeave);

// get a particular leave by empId
adminRouter.route("/leave/:id").get(getLeavesFromEmpId);

//For Updating rejection message and making isRejected flag true
adminRouter.route("/leave/:id").post(updateRejectionMessage);

adminRouter.route("/leave/approve/:id").post(approveRequest);

adminRouter.route("/deparatment/:id").get(getDeparatmentbyId);

async function getDeparatmentbyId(req, res) {
  // localhost:5000/admin/deparatment/Engineering(Department Name)
  let departmentName = req.params.id;
  try {
    let allUser = await UserModel.find({ deparatment: departmentName });
    console.log(allUser);
    res.json(allUser);
  } catch (error) {
    console.log(error.message);
  }
}

async function allLeaves(req, res) {
  console.log("Request has came");
  try {
    let allleaves = await LeaveModel.find();
    if (allleaves) console.log("data has came", allleaves);
    return res.json(allleaves);
  } catch (error) {
    console.log("error message -->> ", error);
  }
}

async function addLeave(req, res) {
  console.log("Data Came from post method Leave", req.body);
  let data = req.body;
  let addnewLeave = await LeaveModel.create(data);
  res.send(addnewLeave);
}

async function getLeavesFromEmpId(req, res) {
  let empId = req.params.id;
  console.log("Employee Id send from Frontend", empId);

  try {
    let response = await LeaveModel.find({ employeId: empId });
    if (response) console.log(response, "data from getleavesfromempid");
    return res.json(response);
  } catch (error) {
    console.log(error);
    res.json({
      source: "from getLeavesFromEmpId",
      errorObj : error
    });
  }
}

async function updateRejectionMessage(req, res) {
  try {
    let uniqueLeaveId = req.params.id;
    let messageORejection = req.body.reasonOfRejection;
    // uiqLevId = c888e41f-f463-47b9-824d-daed20061f13
    console.log("empId from rejection", uniqueLeaveId);
    // console.log("MessageOfRejection",  messageORejection.rejectionMessage);
    // console.log("MessageOfRejection", messageORejection);

    let responseObj = await LeaveModel.findOneAndUpdate(
      { leaveId: uniqueLeaveId },
      {
        $set: {
          reasonOfRejection: messageORejection,
          isApproved: false,
          isRejected: true,
          isPending: false,
        },
      }
    );

    console.log(responseObj);
    return res.json(responseObj);
  } catch (error) {
    console.log(error);
  }
}

async function approveRequest(req, res) {
  try {
    let uniqueLeaveId = req.params.id;

    let responseObj = await LeaveModel.findOneAndUpdate(
      { leaveId: uniqueLeaveId },
      { $set: { isApproved: true, isPending: false } }
    );
    
    console.log('approve reqest', responseObj)

    // leaves takend in the year remaining.....
    let userObj = await UserModel.findOneAndUpdate(
      { id: responseObj.employeId },
      {
        $set: {
          leavesTakenInMonth: responseObj.noofDaysLeaveRequired,
            // responseObj.leavesTakenInMonth + responseObj.noofDaysLeaveRequired,
          paidLeavesRemaining: responseObj.noofDaysLeaveRequired
            // responseObj.remainingLeaves - responseObj.noofDaysLeaveRequired,
        },
      }
    );

    console.log('approve req user', userObj);

    // res.json({
    //   leaveObj : responseObj,
    //   userObj : userObj
    // })

    res.json(responseObj);


    console.log("userObject after updating the leave",userObj);

  } catch (error) {
    console.log(error);
  }
}

module.exports = adminRouter;
