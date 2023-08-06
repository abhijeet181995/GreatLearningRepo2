const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { generateId } = require("./services/Util");
const app = express();
const path = require('path');

require("./models/Company");
require("./models/University");
require("./models/Student");
require("./models/Course");

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname+"/public")))

require("./routes/Company")(app);
require("./routes/University")(app);
require("./routes/Student")(app);
require("./routes/Course")(app);

const uri = "mongodb+srv://jitralespe:jitralespe123@cluster0.hjxop4h.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);

app.get("/id", (req, res) => {
  let { id } = req.cookies;
  if (!id) {
    id = generateId();
    res.cookie("id", id);
  }
  return res.send({ id });
});

app.listen(5000, () => {
  console.log("express app started on port 5000");
});
