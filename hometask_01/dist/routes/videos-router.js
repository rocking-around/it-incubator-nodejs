"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.videosRouter = (0, express_1.Router)({});
exports.videosRouter.get("/", (req, res) => {
    res.status(200).send(db_1.db.videos);
});
exports.videosRouter.post("/", (req, res) => {
    //1) проверяем приходящие данные на валидность (добавим на следующем шаге)
    //2) создаем newDriver
    const lastVideo = db_1.db.videos[db_1.db.videos.length - 1];
    const newVideo = {
        id: lastVideo ? lastVideo.id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        availableResolutions: req.body.availableResolutions,
    };
    db_1.db.videos.push(newVideo);
    res.status(201).send(newVideo);
});
exports.videosRouter.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const video = db_1.db.videos.find(v => v.id === id);
    if (video) {
        return res.status(200).send(video);
    }
    return res.status(404).send();
});
exports.videosRouter.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const video = db_1.db.videos.find(v => v.id === id);
    if (!video) {
        return res.status(404).send();
    }
    const input = req.body;
    video.title = input.title;
    video.author = input.author;
    video.availableResolutions = input.availableResolutions;
    video.canBeDownloaded = input.canBeDownloaded;
    video.minAgeRestriction = input.minAgeRestriction;
    video.publicationDate = input.publicationDate;
    return res.status(204).send();
});
exports.videosRouter.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = db_1.db.videos.findIndex(v => v.id === id);
    if (index === -1) {
        return res.status(404).send();
    }
    db_1.db.videos.splice(index, 1);
    return res.status(204).send();
});
