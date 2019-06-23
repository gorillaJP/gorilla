const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );

module.exports = merge( common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3002,
        host: '0.0.0.0',
        proxy: {
            "/api": "http://localhost:8080"
        }
    },
} );

//--host 0.0.0.0 --port 3002 --mode=development
// --devtool inline-source-map --hot