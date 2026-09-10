"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Video API",
            version: "1.0.0",
            description: "Video API documentation",
        },
        servers: [
            {
                url: "/hometask_01",
            },
        ],
        tags: [
            {
                name: "Testing",
                description: "API for clearing the database",
            },
            {
                name: "Videos",
                description: "API for managing videos",
            },
        ],
    },
    apis: ["./src/**/*.swagger.yml"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
const swagger = (app) => {
    app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
exports.swagger = swagger;
