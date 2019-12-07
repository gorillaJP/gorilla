// config module does not support webpack. Becase of that, an additional config is needed. Refer below guide
//https://github.com/lorenwest/node-config/wiki/Webpack-Usage

const path = require( 'path' )
const config = require( 'config' )
const nodeExternals = require( 'webpack-node-externals' );
const fs = require( 'fs' )
1

fs.writeFileSync( path.resolve( __dirname, 'config/client.json' ), JSON.stringify( config ) )


console.log( 'asdfsdfsdfasdfasdfasdfasdfasdfasdfasdffasdfasdfasdfasdfasdfasdfasdfasdfasdf' )
console.log( path.resolve( __dirname, 'config/client.json' ) )

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
    },
    resolve: {
        alias: {
            config: path.resolve( __dirname, 'config/client.json' )
        }
    }
}