/**
 * Created by sundongzhi on 16/6/23.
 */
var webpack = require('webpack');
var path = require("path");

var glob = require("glob");

var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(path.join(__dirname,"public/dist/scripts"));

let srcDir = path.resolve(process.cwd(), 'public','src')


let entries = (() => {
        let jsDir = path.resolve(srcDir, 'scripts')
        let entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
        let map = {}

        entryFiles.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    })

return map
})()


let plugins = (() => {
    let entryHtml = glob.sync(srcDir + '/views/*.html')
    let r = []

    entryHtml.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {
            template: 'html!' + filePath,
            filename: filename + '.html'
        }

        if(filename in entries) {
            conf.inject = 'body'
            conf.chunks = ['vender', 'common', filename]
        }

        if(/b|c/.test(filename)) conf.chunks.splice(2, 0, 'common-b-c')

        r.push(new HtmlWebpackPlugin(conf))
    })

    return r
})()

console.log(plugins);

module.exports = {
    entry: {
        index: path.join(__dirname,"public/src/scripts/index.js"),
        vendor: [
            path.join(__dirname,"public/vendor/jquery/dist/jquery.js"),
            path.join(__dirname,"public/vendor/lodash/dist/lodash.js")
        ]
    },
    output: {
        path: __dirname+"/public/dist",
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "[id].[chunkhash:8].bundle.js",
        publicPath: "/"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'html!./public/src/views/index.html',
        //     inject: 'body',
        //     chunks: ['vendor']
        // })

    ].concat(plugins)
};