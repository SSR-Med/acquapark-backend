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
require("./models/Associations");

// Middleware and json
app.use(express.json());
app.use(cors());

// Routes
app.use("/", require("./routes/login/Login"));
app.use("/admin", require("./routes/user/Admin"));
app.use("/token", require("./routes/token/Token"));
app.use("/record", require("./routes/record/Record"));
app.use("/reference", require("./routes/reference/Reference"));

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