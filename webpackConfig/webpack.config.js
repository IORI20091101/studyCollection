/**
 * Created by sundongzhi on 16/6/23.
 */
'use strict'
let webpack = require('webpack');
let path = require("path");

let glob = require("glob");

let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin');

let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin


console.log(path.resolve(__dirname,"public/dist/scripts"));

let srcDir = path.join(process.cwd(), 'public','src')
let distDir = path.join(process.cwd(), 'public', 'dist');

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
    let entryHtml = glob.sync(path.join(srcDir,'views') + '/*.html')
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

        r.push(new HtmlWebpackPlugin(conf))
    })

    return r
})()


let publicPath = '/'
let extractCSS
let cssLoader
let sassLoader
extractCSS = new ExtractTextPlugin('css/[name].css?[contenthash]')
cssLoader = extractCSS.extract(['css'])
sassLoader = extractCSS.extract(['css', 'sass'])
plugins.push(extractCSS, new webpack.HotModuleReplacementPlugin())


console.log(plugins);

module.exports = {
    entry: Object.assign(entries, {
        // 用到什么公共lib（例如React.js），就把它加进vender去，目的是将公用库单独提取打包
        'vender': [
            path.resolve(__dirname,"public/vendor/jquery/dist/jquery.js"),
            path.resolve(__dirname,"public/vendor/lodash/dist/lodash.js")
        ]
    }),
    output: {
        path: path.resolve(__dirname , "public/dist"),
        filename: "[name].js",
        chunkFilename: "[chunkhash:8].chunk.js",
        hotUpdateChunkFilename: '[id].js',
        publicPath: "/",
        sourceMapFilename: './source.map'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'html!./public/src/views/index.html',
        //     inject: 'body',
        //     chunks: ['vendor']
        // })
        new CommonsChunkPlugin({
            name: 'common',
            chunks: ['a', 'b']
        })

    ].concat(plugins)
};