const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );
const path = require( 'path' )
var CompressionPlugin = require( 'compression-webpack-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' )



const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;


module.exports = merge( common, {
  mode: 'production',
  output: {
    path: path.join( __dirname, './src/server/public' ),
    filename: 'frontend_bundle.js'
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },

  plugins: [
    new BundleAnalyzerPlugin(),
    new CompressionPlugin( {
      test: /\.js(\?.*)?$/i,
    } )
  ]
} );