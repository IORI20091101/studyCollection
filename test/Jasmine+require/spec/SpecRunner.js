require.config({
    baseUrl: './',
    paths: {
        jasmine: 'lib/jasmine-2.4.1/jasmine',
        "jasmine-html": 'lib/jasmine-2.4.1/jasmine-html',
        boot: 'lib/jasmine-2.4.1/boot',
        a:'src/a',
        src:'src/src'
    },
    shim: {
        'jasmine': {
            exports: 'window.jasmineRequire'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'window.jasmineRequire'
        },
        'boot': {
            deps: ['jasmine', 'jasmine-html'],
            exports: 'window.jasmineRequire'
        }
    }
});

var specs = [
    'spec/srcSpec'
];

require(['boot'], function () {
    require(specs, function () {
        window.onload();
    });
});