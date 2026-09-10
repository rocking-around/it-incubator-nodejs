type UpdateVideoInputModel = {
    title: string;
    author: string;
    availableResolutions: Resolution[];
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
};