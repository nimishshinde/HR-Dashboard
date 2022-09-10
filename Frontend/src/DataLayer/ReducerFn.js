export const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confrimPassword: "",
  address: "",
  phoneNumber: "",
  deparatment: "",
  employeeType: 2,
  // photo: String,
  // leavesTakenInMonth: Number,
  // leavesTakenInYear: Number,
  // paidLeavesRemaining: Number,
  // tasksOfTheMonth: Number,
  // tasksCompletedInMonth: Number,
  // performanceOfPerviousMonth: Number,
  // performanceMessage: String,
  // shiftOfCurrentMonth: String,
  // PayrollMangement: {
  //   halfDayTaken: Boolean,
  //   monthsSalaryNotCredited: [[String]],
  //   difference: Number,
  // },
};

const reducerFn = (state = initialState, action) => {
  console.log(action, "from the reducerFn file");
  switch (action.type) {
    case "firstName":
      return { ...state, firstName: action.value };
    case "lastName":
      return { ...state, lastName: action.value };
    case "email":
      return { ...state, email: action.value };
    case "password":
      return { ...state, password: action.value };
    case "confirm":
      return { ...state, confirmPassword: action.value };
    case "address":
      return { ...state, address: action.value };
    case "phone":
      return { ...state, phoneNumber: action.value };
    case "type":
      return { ...state, employeeType: action.value };
    case "department":
      return { ...state, deparatment: action.value };
    default:
      return state;
  }
};

// export const reducerFnforLogin = (state, action) => {
//   switch(action.type){
//     case 'loginObj' :
//       return action.value
//   }
// }

// export const userObj = {
//   employeeType: Number,
//   deparatment: String,
//   id: String,
//   firstName: String,
//   lastName: String,
//   email: String,
//   password: String,
//   confirmPassword: String,
//   phoneNumber: String,
//   photo: String,
//   address: String,
//   leavesTakenInMonth: Number,
//   leavesTakenInYear: Number,
//   paidLeavesRemaining: Number,
//   tasksOfTheMonth: Number,
//   tasksCompletedInMonth: Number,
//   performanceOfPerviousMonth: Number,
//   performanceMessage: String,
//   shiftOfCurrentMonth: String,
//   PayrollMangement: {
//     halfDayTaken: Boolean,
//     monthsSalaryNotCredited: [[String]],
//     difference: Number,
//   },
// };

export default reducerFn;
