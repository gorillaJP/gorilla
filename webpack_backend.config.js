const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin') //creates index.html
var nodeExternals = require('webpack-node-externals');

module.exports = {

    entry: './src/server/index.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, './src/server'),
        filename: 'backend.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "./src/server"),
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