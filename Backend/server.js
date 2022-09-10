const express = require("express");
const app = express();
const { UserModel } = require("./UserModel");

const authRouter = require("./Routes/authRouter");
const adminRouter = require("./Routes/adminRouter");

// Cros
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Setting up server and middlewares.
app.use(express.json());
app.listen(5000, () => {
  //   await connection;
  console.log("Active at port 5000");
});

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
