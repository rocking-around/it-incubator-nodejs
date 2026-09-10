import {Resolution} from "./Resolution";

export type UpdateVideoInputModel = {
    title: string;
    author: string;
    availableResolutions: Resolution[];
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
};
