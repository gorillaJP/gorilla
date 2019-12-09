import config from 'config';

export default {
    swaggerDefinition: {
        info: {
            description: 'Gorilla APIs',
            title: 'APIs',
            version: '1.0.0',
        },
        host: config.swagger.host + ':' + config.swagger.port,
        basePath: '/',
        schemes: config.swagger.schemes,
        produces: [
            "application/json",
            "application/xml"
        ],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: [ './swaggerdoc.js' ] //Path to the API handle folder
}