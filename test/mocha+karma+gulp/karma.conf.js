// Karma configuration
// Generated on Fri Apr 08 2016 15:51:49 GMT+0800 (CST)



    // "karma": "^0.13.22",
    // "chai": "^3.5.0",
    // "mocha": "~2.3.4",
    // "babel-core": "~6.2.1",
    // "babel-polyfill": "^6.7.4",
    // "babel-preset-es2015": "~6.1.18",
    // "mochawesome": "~1.2.1",
    // "node-fetch": "~1.3.3",
    // "superagent": "~1.4.0",


module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','chai'],


    // list of files / patterns to load in the browser

    // files: [
    //     'js/**/*.js',
    //     'test/**/*.spec.js'
    // ],
    files: [
        'src/*.js',
        'test/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
