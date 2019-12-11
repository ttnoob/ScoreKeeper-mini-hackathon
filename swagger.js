// Build swagger

module.exports = function (app) {
    var swaggerUi = require('swagger-ui-express');
    var swaggerJSDoc = require('swagger-jsdoc');

    const swaggerDefinition = {
        info: {
            title: 'API Service',
            version: '1.0.0',
            description: 'API for ScoreKeeper',
        },
        host: 'localhost:3000',
        // basePath: '/serten',
        swagger: "2.0",
        securityDefinitions: {
        },
    };

    const options = {
        swaggerDefinition,
        apis: ['routes/*.js', './*.js'],
        security: [
            { jwt: [] }
        ],
    };

    const swaggerSpec = swaggerJSDoc(options);
    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    // API Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}