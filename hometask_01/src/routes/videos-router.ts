import {Response, Router} from "express";
import {db} from "../db/db";
import {APIErrorResult} from "../models/APIErrorResult";
import {CreateVideoInputModel} from "../models/CreateVideoInputModel";
import {FieldError} from "../models/FieldError";
import {UpdateVideoInputModel} from "../models/UpdateVideoInputModel";
import {Video} from "../models/Video";
import {
    missingVideoIdError,
    validateCreateVideoInput,
    validateUpdateVideoInput,
    validateVideoId,
} from "../validation/videos-validation";

export const videosRouter = Router({})

const sendBadRequest = <TResponse>(
    res: Response<TResponse | APIErrorResult>,
    errorsMessages: FieldError[]
) => {
    const errorResult: APIErrorResult = {errorsMessages};
    return res.status(400).send(errorResult);
};


videosRouter.get<{}, Video[]>("/", (req, res) => {
    res.status(200).send(db.videos);
})

videosRouter.post<{}, Video | APIErrorResult, CreateVideoInputModel>("/", (req, res) => {
    const errors = validateCreateVideoInput(req.body);
    if (errors.length > 0) {
        return sendBadRequest(res, errors);
    }

    const input = req.body;
    const lastVideo = db.videos[db.videos.length - 1];
    const newVideo: Video = {
        id: lastVideo ? lastVideo.id + 1 : 1,
        title: input.title,
        author: input.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(),
        availableResolutions: input.availableResolutions,
    };
    db.videos.push(newVideo);
    res.status(201).send(newVideo);
});

videosRouter.get<{id: string}, Video | APIErrorResult>("/:id", (req, res) => {
    const errors = validateVideoId(req.params.id);
    if (errors.length > 0) {
        return sendBadRequest(res, errors);
    }

    const id = Number(req.params.id);
    const video = db.videos.find(v => v.id === id);
    if (video) {
        return res.status(200).send(video);
    }
    return res.status(404).send();
})

videosRouter.put<{id: string}, APIErrorResult | void, UpdateVideoInputModel>("/:id", (req, res) => {
    const idErrors = validateVideoId(req.params.id);
    if (idErrors.length > 0) {
        return sendBadRequest(res, idErrors);
    }

    const id = Number(req.params.id);
    const video = db.videos.find(v => v.id === id);

    if (!video) {
        return res.status(404).send();
    }

    const bodyErrors = validateUpdateVideoInput(req.body);
    if (bodyErrors.length > 0) {
        return sendBadRequest(res, bodyErrors);
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

videosRouter.delete<{id: string}, APIErrorResult | void>("/:id", (req, res) => {
    const errors = validateVideoId(req.params.id);
    if (errors.length > 0) {
        return sendBadRequest(res, errors);
    }

    const id = Number(req.params.id);
    const index = db.videos.findIndex(v => v.id === id);
    if (index === -1) {
        return res.status(404).send();
    }
    db.videos.splice(index, 1);
    return res.status(204).send();
});
