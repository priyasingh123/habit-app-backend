const connectToDB = require("./db.js");
const express = require("express");
const habitsRouter = require("./routes/habits.js");
const dayRecordsRouter = require("./routes/dayrecords.js");
const aiRouter = require("./routes/ai.js");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/", habitsRouter);
app.use("/", dayRecordsRouter);
app.use("/ai", aiRouter);

async function startServer() {
  await connectToDB(); // first connect to DB
  app.listen(port, "0.0.0.0", async () => {
    // then start server
    console.log("app listening to port", port);
  });
}

startServer();
