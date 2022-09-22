const mongoose = require("mongoose");

// Link to connect to mongo db atlas
let dbLink =
  "mongodb+srv://shindenimish:nimish2310@cluster0.pn6ecqh.mongodb.net/?retryWrites=true&w=majority";

// Setting up basic connect
mongoose
  .connect(dbLink)
  .then(() => {
    console.log("Connected 🥳");
  })
  .catch((err) => {
    console.log(err, "Not Connected 😢");
  });

// Schema for all Employees
let userSchema = new mongoose.Schema({
  employeeType: {
    type: Number,
    required: true,
  },
  deparatment: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    minLength: 10,
    maxLength: 10,
    required: true,
  },
  photo: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  leavesTakenInMonth: {
    type: Number,
    default: 0,
  },
  leavesTakenInYear: {
    type: Number,
    default: 0,
  },
  paidLeavesRemaining: {
    type: Number,
    default: 12,
  },
  tasksOfTheMonth: {
    type: Number,
    default: 0,
  },
  tasksCompletedInMonth: {
    type: Number,
    default: 0,
  },
  performanceOfPerviousMonth: {
    type: Number,
    default: 100,
  },
  performanceMessage: {
    type: String,
  },
  shiftOfCurrentMonth: {
    type: String,
  },
  PayrollMangement: {
    salaryCreditedThisMonth: {
      type: Boolean,
      default: false,
    },
    halfDayTaken: {
      type: Number,
      default: 0,
    },
    monthsSalaryNotCredited: [[String]],
    difference: {
      type: Number,
      default: 0,
    },
  },
});

let leaveModel = new mongoose.Schema({
  employeName: {
    type: String,
  },
  employeId: {
    type: Number,
  },
  designation: {
    type: String,
  },
  deparatment: {
    type: String,
  },
  remainingLeaves: {
    type: Number,
  },
  leavesTakenInMonth: {
    type: Number,
  },
  isApproved: {
    type: Boolean,
  },
  isRejected: {
    type: Boolean,
  },
  reasonOfLeave: {
    type: String,
  },
  noofDaysLeaveRequired: {
    type: Number,
  },
  dateOfLeave: {
    type: Date,
  },
  endOfLeave: {
    type: Date,
  },
  reasonOfRejection: {
    type: String,
  },
  leaveId: {
    type: String,
  },
  isPending : {
    type : Boolean,
  }
});

// creating model with name HR-Dashboard and Leave in cluster0
// Using Leave to Manage leaves of employees.
// HR-Dashboard is to manage all user data.
const LeaveModel = mongoose.model("Leave", leaveModel);
const UserModel = mongoose.model("HR-Dashboard", userSchema);

module.exports = { UserModel, LeaveModel };
