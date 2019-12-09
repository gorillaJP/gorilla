import config from 'config';


export default {
    swaggerDefinition: {
        info: {
            description: 'Gorilla APIs',
            title: 'APIs',
            version: '1.0.0',
        },
        host: config.host + ':' + config.port,
        basePath: 'v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: [ 'http', 'https' ],
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