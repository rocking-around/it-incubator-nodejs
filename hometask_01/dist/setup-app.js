"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const videos_router_1 = require("./routes/videos-router");
const testing_router_1 = require("./routes/testing-router");
const swagger_1 = require("./swagger/swagger");
const db = [];
const setupApp = (app) => {
    app.use(express_1.default.json()); // middleware для парсинга JSON в теле запроса
    // основной роут
    // app.get("/", (req, res) => {
    //     res.status(200).send("Hello world!");
    // });
    app.use("/hometask_01/api/videos", videos_router_1.videosRouter);
    app.use("/hometask_01/api/testing", testing_router_1.testingRouter);
    (0, swagger_1.swagger)(app);
    return app;
};
exports.setupApp = setupApp;
