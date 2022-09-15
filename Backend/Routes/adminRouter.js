const express = require("express");
const {LeaveModel} = require('../UserModel');
const {UserModel} = require('../UserModel');

const adminRouter = express.Router();

adminRouter.route("/leave").get(allLeaves);
adminRouter.route("/leave").post(addLeave);

adminRouter.route("/deparatment/:id").get(getDeparatmentbyId);

async function getDeparatmentbyId(req, res){
    let departmentName = req.params.id;
    console.log(req.params.id)

    console.log("Hello from Deparatment", departmentName);
    

    try {
        let allUser = await UserModel.find({ deparatment : departmentName });
        console.log(allUser);
        res.json( allUser );

    } catch (error) {
        console.log(error.message);
    }
}


async function allLeaves(req, res){
    console.log("Request has came");
    try {
        let allleaves = await LeaveModel.find();
        if(allleaves) console.log("data has came", allleaves);
        return res.send(allleaves);
    } catch (error) {
        console.log("error message -->> ",error)
    }
}

async function addLeave(req, res){
    console.log("Data Came from post method Leave" , req.body);
    let data = req.body;
    let addnewLeave = await LeaveModel.create(data);
    res.send(addnewLeave);

    // Postman testing schema
    // {
    //     "isApproved" : "false",
    //     "isRejected" : "true",
    //     "reasonOfLeave" : "Want to kill the White Walkers",
    //     "noofDaysLeaveRequired" : "5",
    //     "dateOfLeave" : "10 June 2022",
    //     "leavesTakenInMonth" : "6",
    //     "remainingLeaves" : "16",
    //     "deparatment" : "Engineering Platform",
    //     "designation" : "Full Stack Developer Javascript",
    //     "employeId" : "10",
    //     "employeName" : "John Snow"
    // }
}

module.exports = adminRouter;

