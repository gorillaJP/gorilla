const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );
const path = require( 'path' )
var CompressionPlugin = require( 'compression-webpack-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' )

const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;


//const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

module.exports = merge( common, {
  mode: 'production',
  output: {
    path: path.join( __dirname, './src/server/public' ),
    filename: 'frontend_bundle.js'
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin( {
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      } )
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor_app',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },

  plugins: [
    new CompressionPlugin( {
      test: /\.js(\?.*)?$/i,
    } )
  ]
} );