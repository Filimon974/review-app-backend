const swaggerJsDoc = require("swagger-jsdoc");

const options = {

  definition: {
    openapi: "3.0.0",

    info: {
      title: "Review App API",
      version: "1.0.0",
      description: "API documentation for Review App"
    },

    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://review-app-backend-due5.onrender.com/api"
            : "http://localhost:5000/api"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./routes/*.js"]
};

const swaggerSpec =
  swaggerJsDoc(options);

module.exports = swaggerSpec;