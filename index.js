const connectToDB = require("./db.js");
const express = require("express");
const habitsRouter = require("./routes/habits.js");

const app = express();
const port = 5000;

app.use(express.json());
app.use("/", habitsRouter);

function startServer() {
  connectToDB(); // first connect to DB
  app.listen(port, async () => {
    // then start server
    console.log("app listening to port", port);
  });
}

startServer();
