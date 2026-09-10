"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosSwagger = void 0;
exports.videosSwagger = {
    "/hometask_01/api/videos": {
        get: {
            summary: "Get all videos",
            tags: ["Videos"],
            responses: {
                200: {
                    description: "List of all videos"
                }
            }
        },
        post: {
            summary: "Create video",
            tags: ["Videos"],
            responses: {
                201: {
                    description: "Video created"
                },
                400: {
                    description: "Validation error"
                }
            }
        }
    },
    "/hometask_01/api/videos/{id}": {
        get: {
            summary: "Get video by id",
            tags: ["Videos"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Video found"
                },
                404: {
                    description: "Video not found"
                }
            }
        },
        put: {
            summary: "Update video",
            tags: ["Videos"],
            responses: {
                204: {
                    description: "Video updated"
                },
                404: {
                    description: "Video not found"
                }
            }
        },
        delete: {
            summary: "Delete video",
            tags: ["Videos"],
            responses: {
                204: {
                    description: "Video deleted"
                },
                404: {
                    description: "Video not found"
                }
            }
        }
    }
};
