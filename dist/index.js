"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const express_1 = __importDefault(require("express"));
const cors = require("cors");
// Database
const Database_1 = require("./config/Database");
// Env variables
const Config_1 = require("./config/Config");
const app = (0, express_1.default)();
// Models
const { Reference } = require("./models/Reference");
const { User } = require("./models/User");
const { Record } = require("./models/Record");
// Middleware and json
app.use(express_1.default.json());
app.use(cors());
// Routes
app.use("/", require("./routes/login/Login"));
app.use("/admin", require("./routes/user/Admin"));
app.use("/token", require("./routes/token/Token"));
app.use("/record", require("./routes/record/Record"));
app.use("/reference", require("./routes/reference/Reference"));
Database_1.database
    .authenticate()
    .then(() => {
    return Database_1.database.sync();
})
    .then(() => {
    app.listen(Config_1.port, () => {
        console.log(`Server listen on http://localhost:${Config_1.port}`);
    });
})
    .catch((error) => {
    console.error('Connection fail', error);
});
