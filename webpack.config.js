const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin') //creates index.html
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const fs = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/client/theme.less'), 'utf8'));


module.exports = {

    entry: './src/client/index.js',
    output: {
        path: path.join(__dirname, './src/server/public'),
        filename: 'frontend_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.(css|scss)$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: '@svgr/webpack',
                        options: {
                            babel: false,
                            icon: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: themeVariables,
                            root: path.resolve(__dirname, './'),
                            javascriptEnabled: true

                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        port: 3000,
        proxy: {
            "/api": "http://localhost:8080"
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/client/index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}