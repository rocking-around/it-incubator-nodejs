import {Request, Response, Router} from "express";
import { db } from "../db/db";

export const testingRouter = Router({})

testingRouter.delete("/all-data", (req: Request, res: Response) => {
    db.videos.length = 0;

    return res.status(204).send();
});