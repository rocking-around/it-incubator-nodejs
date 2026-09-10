import {Request, Response, Router} from "express";
import {db} from "../db/db";

export const videosRouter = Router({})


videosRouter.get("/", (req: Request, res: Response) => {
    res.status(200).send(db.videos);
})

videosRouter.post("/", (req, res) => {
    //1) проверяем приходящие данные на валидность (добавим на следующем шаге)
    //2) создаем newDriver
    const lastVideo = db.videos[db.videos.length - 1];
    const newVideo: Video = {
        id: lastVideo ? lastVideo.id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(),
        availableResolutions: req.body.availableResolutions,
    };
    db.videos.push(newVideo);
    res.status(201).send(newVideo);
});

videosRouter.get("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const video = db.videos.find(v => v.id === id);
    if (video) {
        return res.status(200).send(video);
    }
    return res.status(404).send();
})

videosRouter.put("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const video = db.videos.find(v => v.id === id);

    if (!video) {
        return res.status(404).send();
    }

    const input: UpdateVideoInputModel = req.body;

    video.title = input.title;
    video.author = input.author;
    video.availableResolutions = input.availableResolutions;
    video.canBeDownloaded = input.canBeDownloaded;
    video.minAgeRestriction = input.minAgeRestriction;
    video.publicationDate = input.publicationDate;

    return res.status(204).send();
});

videosRouter.delete("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = db.videos.findIndex(v => v.id === id);
    if (index === -1) {
        return res.status(404).send();
    }
    db.videos.splice(index, 1);
    return res.status(204).send();
});