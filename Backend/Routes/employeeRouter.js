const express = require("express");
const { UserModel } = require("../UserModel");

const employeeRouter = express.Router();

employeeRouter.route("/details/:id").get(getEmpByDetails);
async function getEmpByDetails(req, res){
   let empId = req.params.id;
   try {
      let updatedEmpObj = await UserModel.find({ id : empId })
      res.json(updatedEmpObj);

   } catch (error) {
      console.log(error);
   }
}


module.exports = employeeRouter;
