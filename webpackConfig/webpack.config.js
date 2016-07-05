/**
 * Created by sundongzhi on 16/6/23.
 */
'use strict'
let webpack = require('webpack');
let path = require("path");

let glob = require("glob");

let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin');

let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

let pathMap = require('./public/src/pathmap.json')

let srcDir = path.join(process.cwd(), 'public','src')
let distDir = path.join(process.cwd(), 'public', 'dist');
let nodeModPath = path.resolve(__dirname, './node_modules')

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







module.exports = (options) => {

    options = options || {}

    let debug = options.debug !== undefined ? options.debug : true

    let publicPath = '/'
    let extractCSS
    let cssLoader
    let sassLoader


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
                conf.chunks = ['vendor', 'common', filename]
            }

            r.push(new HtmlWebpackPlugin(conf))
        })

        return r
    })()


    if(debug) {
        extractCSS = new ExtractTextPlugin('styles/[name].css?[contenthash]')
        cssLoader = extractCSS.extract(['css'])
        sassLoader = extractCSS.extract(['css', 'sass'])
        plugins.push(extractCSS, new webpack.HotModuleReplacementPlugin())
    } else {
        extractCSS = new ExtractTextPlugin('styles/[contenthash:8].[name].min.css', {
            // 当allChunks指定为false时，css loader必须指定怎么处理
            // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
            // 第一个参数`notExtractLoader`，一般是使用style-loader
            // @see https://github.com/webpack/extract-text-webpack-plugin
            allChunks: false
        });

        cssLoader = extractCSS.extract(['css?minimize'])
        sassLoader = extractCSS.extract(['css?minimize', 'sass'])

        plugins.push(
            extractCSS,
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                mangle: {
                    except: ['$', 'exports', 'require']
                }
            }),
            // new AssetsPlugin({
            //     filename: path.resolve(assets, 'source-map.json')
            // }),
            new webpack.optimize.DedupePlugin(),
            new webpack.NoErrorsPlugin()
        )

        plugins.push(new UglifyJsPlugin())
    }


    let config = {
        entry: Object.assign(entries, {
            // 用到什么公共lib（例如React.js），就把它加进vender去，目的是将公用库单独提取打包
            'vendor': [
                'jquery','lodash'
            ]
        }),
        resolve: {
            root: [srcDir, nodeModPath],
            alias: pathMap,
            extensions: ['', '.js', '.css', '.scss', '.tpl', '.png', '.jpg']
        },
        output: {
            path: distDir,
            filename: debug? "[name].js": 'scripts/[chunkhash:8].[name].min.js',
            chunkFilename: debug ? "[chunkhash:8].chunk.js" : "[chunkhash:8].chunk.min.js",
            hotUpdateChunkFilename: debug ? '[id].js' : '[id].[chunkhash:8].min.js',
            publicPath: "/",
            sourceMapFilename: './source.map'
        },
        module: {
            loaders: [
                {
                    test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                    loaders: [
                        // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                        // 否则则调用file-loader，参数直接传入
                        'url?limit=10000&name=img/[hash:8].[name].[ext]',
                        'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
                    ]
                },
                {
                    test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                    loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
                },
                {test: /\.(tpl|ejs)$/, loader: 'ejs'},
                {test: /\.css$/, loader: cssLoader},
                {test: /\.scss$/, loader: sassLoader},
                {test: /\.jsx?$/, loader: 'babel?presets[]=react,presets[]=es2015'}
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
            }),
            new CommonsChunkPlugin({
                name: 'vendor',
                chunks: ['common', 'index']
            })

        ].concat(plugins),

        devServer: {
            hot: true,
            noInfo: false,
            inline: true,
            publicPath: publicPath,
            stats: {
                cached: false,
                colors: true
            }
        }
    };

    if(debug) {
        (function(entry) {
            for (let key of Object.keys(entry)) {
                if (! Array.isArray(entry[key])) {
                    entry[key] = Array.of(entry[key])
                }
                entry[key].push('webpack-hot-middleware/client?reload=true')
            }
        })(config.entry);

        // ((entry) => {
        //     for (let key of Object.keys(entry)) {
        //         if (! Array.isArray(entry[key])) {
        //             entry[key] = Array.of(entry[key])
        //         }
        //         entry[key].push('webpack-hot-middleware/client?reload=true')
        //     }
        // })(config.entry);

        config.plugins.push( new webpack.HotModuleReplacementPlugin() )
        config.plugins.push( new webpack.NoErrorsPlugin() )
    }
    


    return config;
};