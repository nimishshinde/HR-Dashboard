const express = require("express");
const app = express();
const { UserModel } = require("./UserModel");
const authRouter = require("./Routes/authRouter");
const adminRouter = require("./Routes/adminRouter");
const employeeRouter = require("./Routes/employeeRouter");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(cors()); suggestion by Amaan

app.use(express.json());
app.listen(5000, () => {
  console.log("Active at port 5000");
});

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("employee", employeeRouter);
