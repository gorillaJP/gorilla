const path = require( 'path' )
const htmlWebpackPlugin = require( 'html-webpack-plugin' ) //creates index.html
var nodeExternals = require( 'webpack-node-externals' );

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    target: 'node',
    externals: [ nodeExternals() ],
    output: {
        path: path.join( __dirname, './src' ),
        filename: 'backend.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve( __dirname, "./src" ),
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    node: {
        __dirname: false,
        fs: "empty",
        net: "empty"
    }
}