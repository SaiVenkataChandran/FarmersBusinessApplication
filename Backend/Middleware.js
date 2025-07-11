const express = require("express");
const app = express();
const port = 2000;
const auth = (req, res, next) => {
  if (req.params.name === "Ganesh") {
    next();
  } else {
    console.log("You are not allowed");
  }
};
app.get("/", (req, res) => {
  res.send("Welcome to home Page");
});
app.get("/admin/:name", auth, (req, res) => {
  res.send(`Welcome admin ${req.params.name}`);
});
app.get("/about", (req, res) => {
  res.send("This is the About Page.");
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is running at port ${port}`);
  }
});
