import {
  SIGNIN,
  EMPTYP,
  DEP,
  ID,
  FNAME,
  LNAME,
  EMAIL,
  PASSWORD,
  CPASSWORD,
  ADDRESS,
  PHONENO,
  DESIGNATION
} from "./types";

const initialState = JSON.parse(localStorage.getItem('User')) || {
  employeeType: 2,
  deparatment: "",
  designation : "",
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  address: "",
  
  photo: "",
  leavesTakenInMonth: 0,
  leavesTakenInYear: 0,
  paidLeavesRemaining: 12,
  tasksOfTheMonth: 0,
  tasksCompletedInMonth: 0,
  performanceOfPerviousMonth: 100,
  performanceMessage: "",
  shiftOfCurrentMonth: "",
  
  PayrollMangement: {
    salaryCreditedThisMonth: Boolean,
    halfDayTaken: Number,
    monthsSalaryNotCredited: [[String]],
    difference: Number,
  },
  
  };

let signInObj = {
  employeeType: 2,
  deparatment: "",
  designation: "",
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  address: "",

  photo: "",
  leavesTakenInMonth: 0,
  leavesTakenInYear: 0,
  paidLeavesRemaining: 12,
  tasksOfTheMonth: 0,
  tasksCompletedInMonth: 0,
  performanceOfPerviousMonth: 100,
  performanceMessage: "",
  shiftOfCurrentMonth: "",

  PayrollMangement: {
    salaryCreditedThisMonth: Boolean,
    halfDayTaken: Number,
    monthsSalaryNotCredited: [[String]],
    difference: Number,
  },
};

export const reducer = (state = initialState, action) => {
  
  console.log(action.type, action, 'from reducer')

  switch (action.type) {
    case SIGNIN: return signInObj;

    case ID : return {
      ...state,
      id : action.id
    }

    case EMPTYP:
      return {
        ...state,
        employeeType: action.employeeType,
      };

    case DEP:
      return {
        ...state,
        deparatment: action.deparatment,
      };

    case FNAME:
      return {
        ...state,
        firstName: action.firstName,
      };

    case LNAME:
      return {
        ...state,
        lastName: action.lastName,
      };

    case EMAIL:
      return {
        ...state,
        email: action.email,
      };

    case PASSWORD:
      return {
        ...state,
        password: action.password,
      };

    case CPASSWORD:
      return {
        ...state,
        confirmPassword: action.confirmPassword,
      };

    case ADDRESS:
      return {
        ...state,
        address: action.address,
      };

    case PHONENO : return {
      ...state,
      phoneNumber : action.phoneNumber
    }

    case DESIGNATION : return {
      ...state,
      designation : action.designation
    }

    case 'login' : {
      localStorage.setItem("User", JSON.stringify(action.payload));
      return action.payload;
    }

    default: {
      return state;
    }
  }
};
