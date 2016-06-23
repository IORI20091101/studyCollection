/**
 * Created by sundongzhi on 16/6/23.
 */
var webpack = require('webpack');


module.exports = {

    entry: {
        app:"./entry.js",
        vendor: ["./lib"]
    },
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")

    ]
};