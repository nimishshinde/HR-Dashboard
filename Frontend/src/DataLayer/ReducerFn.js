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
};

const reducerFn = (state, action) => {
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
  }
};

export default reducerFn;
