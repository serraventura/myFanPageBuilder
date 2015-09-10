// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    plugins: [
        'karma-jasmine',
        'karma-ng-html2js-preprocessor',
        'karma-phantomjs-launcher',
        //'karma-firefox-launcher',
        //'karma-ie-launcher',
        'karma-chrome-launcher'
    ],

    // list of files / patterns to load in the browser
    files: [

        'app/src/*.js',
        'app/src/**/*.js',
        //'app/src/**/tests/mock/**/*.js',
        'app/src/**/tests/spec/**/*.js',
        // if you wanna load template files in nested directories, you must use this
        'app/src/**/views/**/*.html',
        'app/**/views/**/*.html',
        'app/*.html'

    ],

    preprocessors: {
        'app/src/**/views/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {

        //stripPrefix: 'app/',
        //or define a custom transform function
        cacheIdFromPath: function(filepath) {
            return filepath.match(/src\/.*\/views\/.*\.html/)[0];
        },

        // setting this option will create only a single module that contains templates
        // from all the files, so you can load them all with module('foo')
        moduleName: 'Templates'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9000,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
