const express = require("express");
const { UserModel, UserTaskModel } = require("../UserModel");

const employeeRouter = express.Router();

employeeRouter.route("/details/:id").get(getEmpByDetails);
employeeRouter.route("/updates/:id").get(getDailyUpdatesFromId);
employeeRouter.route("/updatetask/:id").post(updateUserTask);
employeeRouter.route("/updatetodo/:id").post(updateTodo);
employeeRouter.route("/deletetask/:id").delete(deleteTask);


// Employee Details from id -------------------------------------------------------------------------------------------------------------------------
async function getEmpByDetails(req, res) {
  let empId = req.params.id;
  try {
    let updatedEmpObj = await UserModel.find({ id: empId });
    res.json(updatedEmpObj);
  } catch (error) {
    console.log(error);
  }
}

// get daily updates from id -------------------------------------------------------------------------------------------------------
async function deleteTask (req, res){
  let userTaskId = req.params.id;
  let userId = req.body.empId;
  console.log(userTaskId, userId);

  try {
    let responseObj = await UserTaskModel.updateOne(
      { employeId: userId },
      {
        $pull: {
          taskCompletedArr: { taskId: userTaskId },
        },
      },
      { new : true }
    );
      console.log(responseObj)
    res.json( { status:200 } )

  } catch (error) {
    
  }

  // res.json({userTaskId, userId})


}

async function getDailyUpdatesFromId (req, res){
  let empId = req.params.id;

  try {
    let responseObj = await UserTaskModel.findOne({ employeId: empId });
    res.json(responseObj);
  } catch (error) {
    res.json(error);
  }
}

async function updateUserTask(req, res) {
  let empId = req.params.id;
  let newUpdatedtask = req.body;
  console.log(req.body);

  try {
    let responseObj = await UserTaskModel.find({ employeId: empId });

    if (responseObj.length === 0) {
      await UserTaskModel.create({
        employeId: `${empId}`,
        taskCompletedArr: [],
        taskAssignArr: {},
      });

      let newResponse = await updateCompletedTask(empId, newUpdatedtask);
      res.json(newResponse);
    } else {
      let newResponse = await updateCompletedTask(empId, newUpdatedtask);
      res.json(newResponse);
    }
  } catch (error) {
    res.json({
      status: 400,
      errorObj: error.message,
    });
  }

}

async function updateCompletedTask(empId, newUpdatedtask) {
  let newRes = await UserTaskModel.findOneAndUpdate(
    { employeId: empId },
    {
      $push: {
        taskCompletedArr: newUpdatedtask,
      },
    },
    {
      new: true
    }
  );
  return newRes;
}

async function updateTodo(req, res){
  let empId = req.params.id;
  let todoObj = req.body;
  console.log(todoObj);

  let responseObj = await UserTaskModel.findOneAndUpdate({ employeId : empId }, {
    $push : {
      todoArr : todoObj,
    }
  } ,{ new:true });

  res.json(responseObj);
}

module.exports = employeeRouter;
