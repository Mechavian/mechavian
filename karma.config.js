module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        reporters: ['spec', 'coverage'],

        logLevel: config.LOG_ERROR,

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/!(*spec).js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            dir: '.tmp/coverage/',

            reporters: [
                {type: 'text'},  // output to console
                {type: 'cobertura', subdir: '.', file: 'cobertura.txt'},
                {type: 'html', subdir: 'html'}
            ],

            check: {
                global: {
                    statements: 0,
                    lines: 0,
                    functions: 0,
                    branches: 0
                }
            }
        },

        instrumenterOptions: {
            istanbul: {noCompact: true}
        }
    });
};