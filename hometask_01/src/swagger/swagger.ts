import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

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

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const swagger = (app: Express) => {
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};