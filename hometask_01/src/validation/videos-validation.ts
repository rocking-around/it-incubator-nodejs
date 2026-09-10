import {FieldError} from "../models/FieldError";
import {allowedResolutions} from "../models/Resolution";

export const validateCreateVideoInput = (input: any): FieldError[] => {
    const errors: FieldError[] = [];
    input = input || {};

    if (typeof input.title !== "string" || input.title.trim() === "") {
        errors.push({field: "title", message: "title is required"});
    } else if (input.title.length > 40) {
        errors.push({field: "title", message: "title must not exceed 40 characters"});
    }

    if (typeof input.author !== "string" || input.author.trim() === "") {
        errors.push({field: "author", message: "author is required"});
    } else if (input.author.length > 20) {
        errors.push({field: "author", message: "author must not exceed 20 characters"});
    }

    if (!Array.isArray(input.availableResolutions) || input.availableResolutions.length === 0) {
        errors.push({
            field: "availableResolutions",
            message: "availableResolutions must contain at least one item",
        });
    } else if (
        input.availableResolutions.some(
            (resolution: any) => !allowedResolutions.includes(resolution),
        )
    ) {
        errors.push({
            field: "availableResolutions",
            message: "availableResolutions contains an unsupported resolution",
        });
    }

    return errors;
};

export const validateUpdateVideoInput = (input: any): FieldError[] => {
    const errors = validateCreateVideoInput(input);
    input = input || {};

    if (typeof input.canBeDownloaded !== "boolean") {
        errors.push({
            field: "canBeDownloaded",
            message: "canBeDownloaded is required and must be a boolean",
        });
    }

    if (
        input.minAgeRestriction !== null &&
        (!Number.isInteger(input.minAgeRestriction) ||
            input.minAgeRestriction < 1 ||
            input.minAgeRestriction > 18)
    ) {
        errors.push({
            field: "minAgeRestriction",
            message: "minAgeRestriction must be null or an integer from 1 to 18",
        });
    }

    if (
        typeof input.publicationDate !== "string" ||
        isNaN(Date.parse(input.publicationDate))
    ) {
        errors.push({
            field: "publicationDate",
            message: "publicationDate is required and must be a valid date-time",
        });
    }

    return errors;
};

export const validateVideoId = (rawId: unknown): FieldError[] => {
    const id = Number(rawId);
    if (!Number.isInteger(id) || id <= 0) {
        return [{field: "id", message: "id is required and must be a positive integer"}];
    }

    return [];
};

export const missingVideoIdError = (): FieldError[] => [
    {field: "id", message: "id is required and must be a positive integer"},
];
