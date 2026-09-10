import express, { Express } from "express";
import {videosRouter} from "./routes/videos-router";
import {testingRouter} from "./routes/testing-router";
import {swagger} from "./swagger/swagger";

const db: number[] = [];

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    // app.get("/", (req, res) => {
    //     res.status(200).send("Hello world!");
    // });
    app.use("/hometask_01/api/videos", videosRouter)
    app.use("/hometask_01/api/testing", testingRouter)

    swagger(app);
    return app;
};