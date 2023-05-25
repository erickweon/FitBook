"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const example_router_1 = require("./routers/example_router");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
let dburl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.ha35gkz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose_1.default.connect(dburl)
    .then(() => {
    console.log('Connected to the database ');
})
    .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
});
exports.app.use("/api/example", example_router_1.exampleRouter);
const port = process.env.PORT;
exports.app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
