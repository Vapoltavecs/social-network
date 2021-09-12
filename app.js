const express = require("express");
const { PORT, dbName, dbPassword } = require("./params.json");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/auth", require("./routes/auth"));
const startApp = () => {
  mongoose.connect(
    `mongodb+srv://${dbName}:${dbPassword}@social.ijtq1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
    }
  );
  app.listen(PORT, () => console.log(`server start on ${PORT} port`));
};

startApp();
