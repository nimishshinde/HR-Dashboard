const express = require("express");

const { LeaveModel } = require("../UserModel");
const { UserModel } = require("../UserModel");

const adminRouter = express.Router();

// Gives Employee Details on department
adminRouter.route("/deparatment/:id").get(getDeparatmentbyId);

// Gives all leaves
adminRouter.route("/leave").get(allLeaves);

// Creates a new Leave
adminRouter.route("/leave").post(addLeave);

adminRouter.route("/leave/pending").get(getAllPendingLeaves);

// get a particular leave by empId
adminRouter.route("/leave/:id").get(getLeavesFromEmpId);

//For Updating rejection message and making isRejected flag true
adminRouter.route("/leave/:id").post(updateRejectionMessage);

// should approve and make changes in
// leaves taken in the month & leaves taken in the year
adminRouter.route("/leave/approve/:id").post(approveRequest);


// Performance Message and shift update and bug of leave management.
adminRouter.route("/shift/:id").post(updateEmployeeShift);
adminRouter.route("/performance/:id").post(updatePerformance);
adminRouter.route("/performance/score/:id").post(updatePerformanceScore);

// salary update
adminRouter.route("/salary/:id").post(updateEmployeeSalary);
adminRouter.route("/salary/credit/:id").post(crediteSalaryForThisMonth);

// <----------Salary----------------------------------------------------------------------------------------------------------------------
async function updateEmployeeSalary(req, res) {
  let empId = req.params.id;
  let salary = req.body.salary * 100000;

  let responseObj = await UserModel.findOneAndUpdate(
    { id: empId },
    {
      $set: {
        "PayrollMangement.salary": salary,
      },
    },
    { new: true }
  );

  res.json(responseObj);
}

async function crediteSalaryForThisMonth(req, res) {
  let empId = req.params.id;
  let responseObj = await UserModel.findOneAndUpdate(
    { id: empId },
    {
      $set: {
        "PayrollMangement.salaryCreditedThisMonth": true,
        leavesTakenInMonth: 0,
      },
    },
    { new: true }
  );

  res.json(responseObj);
}

// <---------Employe Shift and performance Update--------------------------------------------------------------------------------------
async function updatePerformance(req, res) {
  let empId = req.params.id;
  let dataObj = req.body;

  console.log(dataObj.performanceMessage);
  console.log(dataObj.performanceScore);

  let performanceScore = Math.ceil((dataObj.performanceScore / 30) * 100);

  let responseObj = await UserModel.findOneAndUpdate(
    { id: empId },
    {
      $set: {
        performanceMessage: dataObj.performanceMessage,
        performanceOfPerviousMonth: performanceScore,
      },
    },
    { new: true }
  );

  res.json(responseObj);
}

async function updatePerformanceScore(req, res) {
  let empId = req.params.id;
  let dataObj = req.body;

  console.log(dataObj.performanceScore);

  let performanceScore = Math.ceil((dataObj.performanceScore / 40) * 100);

  let responseObj = await UserModel.findOneAndUpdate(
    { id: empId },
    {
      $set: {
        // performanceMessage: dataObj.performanceMessage,
        performanceOfPerviousMonth: performanceScore,
      },
    },
    { new: true }
  );

  res.json(responseObj);
}

// <--------All Department Request--------------------------------------------------------------------------------------->
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

// <--------All Leave Request---------------------------------------------------------------------------->
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
  let addnewLeave = await LeaveModel.create(data, { new: true });
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
      errorObj: error,
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
    await LeaveModel.findOneAndUpdate(
      { leaveId: uniqueLeaveId },
      { $set: { isApproved: true, isPending: false } },
      { new: true }
    ).then((responseObj) => {
      console.log("responseFromApproveRequest", responseObj.employeId);
      UserModel.findOne({ id: responseObj.employeId }).then((ress) => {
        let paidLeavesUpdate;
        let leavesTakenInMonthUpdate;
        let leavesTakenInYearUpdate;

        if (ress.paidLeavesRemaining - responseObj.noofDaysLeaveRequired <= 0) {
          paidLeavesUpdate = 0;
        } else {
          paidLeavesUpdate =
            ress.paidLeavesRemaining - responseObj.noofDaysLeaveRequired;
        }

        leavesTakenInMonthUpdate =
          responseObj.noofDaysLeaveRequired + ress.leavesTakenInMonth;

        leavesTakenInYearUpdate =
          responseObj.noofDaysLeaveRequired + ress.leavesTakenInYear;

        UserModel.findOneAndUpdate(
          { id: responseObj.employeId },
          {
            $set: {
              paidLeavesRemaining: paidLeavesUpdate,
              leavesTakenInMonth: leavesTakenInMonthUpdate,
              leavesTakenInYear: leavesTakenInYearUpdate,
            },
          },
          { new: true }
        ).then((updatedUserObj) => {
          res.json(updatedUserObj);
        });
      });
    });
  } catch (error) {
    res.json(error);
  }
}

async function getAllPendingLeaves(req, res) {
  try {
    let responseObj = await LeaveModel.find({ isPending: true });
    res.json(responseObj);
    // res.end('hola')
  } catch (error) {
    res.json({ commingFrom: "getAllPendingLeaves" }, error);
  }
}

//<----------Update Employee Shift------------------------------------------------------------------------------------------------------->
async function updateEmployeeShift(req, res) {
  let empId = req.params.id;
  let userShift = req.body.shift;

  let response = await UserModel.findOneAndUpdate(
    { id: empId },
    { $set: { shiftOfCurrentMonth: userShift } },
    { new: true }
  );

  res.json(response);
}

module.exports = adminRouter;
