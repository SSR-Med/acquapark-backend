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
const { Bug } = require("./models/Bug");
const { Machine } = require("./models/Machine");
const { Alert } = require("./models/Alert");
require("./models/Associations");
// Middleware and json
app.use(express_1.default.json());
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
app.use("/api/log", require("./routes/log/Log"));
Database_1.database
    .authenticate()
    .then(() => {
    return Database_1.database.sync();
})
    .then(() => {
    app.listen(Config_1.port, () => {
    });
})
    .catch((error) => {
});
