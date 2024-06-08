// Dependencies
import express, { Express, Request, Response } from "express";
const cors = require("cors");
// Database
import { database } from "./config/Database";
// Env variables
import { port } from "./config/Config";

const app: Express = express();

// Models
const {Reference} = require("./models/Reference");
const {User} = require("./models/User");
const {Record} = require("./models/Record");
const {Bug} = require("./models/Bug");
const {Machine} = require("./models/Machine");
const {Alert} = require("./models/Alert");
require("./models/Associations");

// Middleware and json
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/login", require("./routes/login/Login"));
app.use("/api/admin", require("./routes/user/Admin"));
app.use("/api/token", require("./routes/token/Token"));
app.use("/api/record", require("./routes/record/Record"));
app.use("/api/reference", require("./routes/reference/Reference"));
app.use("/api/bug", require("./routes/bug/Bug"));
app.use("/api/machine", require("./routes/bug/Machine"));
app.use("/api/alert", require("./routes/bug/Alert"));

database
  .authenticate()
  .then(() => {
    return database.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Connection fail', error);
});