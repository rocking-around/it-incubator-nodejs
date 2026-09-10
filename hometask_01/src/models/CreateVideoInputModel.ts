import {Resolution} from "./Resolution";

export type CreateVideoInputModel = {
    title: string;
    author: string;
    availableResolutions: Resolution[];
};
