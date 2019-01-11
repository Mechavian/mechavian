/// <binding />
module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            outDirectory: process.env.BUILD_BINARIESDIRECTORY || '.out',
            tmpDirectory: '.tmp',
            buildType: 'development',
            siteName: 'mechavian.fc'
        },

        clean: [
            '<%= config.outDirectory %>',
            '<%= config.tmpDirectory %>'
        ],

        less: {
            components: {
                options: {
                    relativeUrls: true
                },
                src: '<%= config.tmpDirectory %>/less/app.less',
                dest: '<%= config.tmpDirectory %>/css/<%= config.siteName %>.css'
            }
        },

        cssmin: {
            mechavian: {
                files: [
                    {
                        src: '<%= config.tmpDirectory %>/css/<%= config.siteName %>.css',
                        dest: '<%= config.tmpDirectory %>/css/<%= config.siteName %>.min.css'
                    }
                ]
            }
        },

        ngtemplates: {
            'maApp.core': {
                files: {
                    '<%= config.tmpDirectory %>/js/__templates.js': [
                        'src/app/pages/{*/,}*.html'
                    ]
                },
                options: {
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true,
                        removeComments: true
                    }
                }
            }
        },

        jshint: {
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                funcscope: true,
                globals: {
                    angular: true,
                    jQuery: true,
                    module: false,
                    inject: false,
                    FB: true
                },
                latedef: false,
                nocomma: true,
                nonbsp: true,
                nonew: true,
                notypeof: true,
                shadow: 'outer',
                undef: true,
                unused: true
            },

            production: {
                options: {
                    browser: true,
                    devel: true
                },

                files: {
                    src: ['src/app/**/*.js', '!src/app/**/*.spec.js']
                }
            },

            test: {
                options: {
                    jasmine: true
                },

                files: {
                    src: ['src/app/**/*.spec.js']
                }
            }
        },

        jscs: {
            options:  grunt.file.readJSON('.jscsrc'),
            files: {
                src: ['gruntfile.js', 'src/app/**/*.js']
            }
        },

        uglify: {
            mechavian: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    wrap: true
                },

                files: [
                    {
                        dest: '<%= config.tmpDirectory %>/js/<%= config.siteName %>.min.js',
                        src: [
                            'src/app/app.js', // app.js needs to be the first JS file
                            'src/app/**/*.js',
                            '<%= config.tmpDirectory %>/js/__templates.js',
                            '!src/app/**/*.spec.js'
                        ]
                    }
                ]
            }
        },

        copy: {
            // Directly copies assets to output folder
            mechavianCore: {
                files: [
                    {src: 'node_modules/mechavian-ui-core/lib/images/fi/favicon.ico', dest: '<%= config.outDirectory %>/client/favicon.ico'},
                    {
                        expand: true,
                        cwd: 'node_modules/mechavian-ui-core/lib/images',
                        dest: '<%= config.outDirectory %>/client/images',
                        src: '**/*.*'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/mechavian-ui-core/lib/js',
                        dest: '<%= config.outDirectory %>/client/js',
                        src: '*.*'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/mechavian-ui-core/lib/css',
                        dest: '<%= config.outDirectory %>/client/css',
                        src: '*.*'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/mechavian-ui-core/lib/fonts',
                        dest: '<%= config.outDirectory %>/client/fonts',
                        src: '*.*'
                    }
                ]
            },

            staticFiles: {
                options: {},
                files: [
                    {src: 'web.config', dest: '<%= config.outDirectory %>/web.config'},
                    {src: 'package.json', dest: '<%= config.outDirectory %>/package.json'},
                    {src: 'src/robots.txt', dest: '<%= config.outDirectory %>/client/robots.txt'},
                    {
                        expand: true,
                        cwd: 'src/images',
                        dest: '<%= config.outDirectory %>/client/images/',
                        src: '{index/,fi/,}{*/,}*.{xml,png,jpg,gif}'
                    }
                ]
            },

            css: {
                files: [
                    {
                        dest: '<%= config.outDirectory %>/client/css/<%= config.siteName %>.min.css',
                        src: '<%= config.tmpDirectory %>/css/<%= config.siteName %>.min.css'
                    }
                ]
            },

            js: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.tmpDirectory %>/js',
                        dest: '<%= config.outDirectory %>/client/js',
                        src: ['*.*', '!__*.*']
                    },
                    {src: 'src/host.js', dest: '<%= config.outDirectory %>/host.js'}
                ]
            },

            html: {}
        },

        preprocess: {
            html: {
                options: {
                    context: {
                        version: '<%= pkg.version %>',
                        year: '<%= grunt.template.today("yyyy") %>',
                        buildType: '<%= config.buildType %>'
                    }
                },
                files: [
                    {
                        dest: '<%= config.outDirectory %>/client/index.html',
                        src: 'src/html/index.html'
                    }
                ]
            }
        },

        injector: {
            options: {
                lineEnding: '\r\n',
                relative: true
            },

            less: {
                options: {
                    template: 'src/less/app.less',
                    transform: function(filePath) {
                        return '@import \'' + filePath + '\';';
                    },
                    starttag: '// injector',
                    endtag: '// endinjector'
                },
                src: [
                    'src/less/colors.less',
                    'src/less/variables.less',
                    'src/app/{components,pages}/{*/,}*.less'
                ],
                dest: '<%= config.tmpDirectory %>/less/app.less'
            },

            index: {
                options: {
                    template: '<%= config.outDirectory %>/client/index.html',
                    addRootSlash: false
                },
                files: [
                    {
                        dest: '<%= config.outDirectory %>/client/index.html',
                        src: [
                            '<%= config.outDirectory %>/client/css/mechavian.min.css',
                            '<%= config.outDirectory %>/client/css/<%= config.siteName %>.min.css',
                            '<%= config.outDirectory %>/client/js/vendor.min.js',
                            '<%= config.outDirectory %>/client/js/mechavian.min.js',
                            '<%= config.outDirectory %>/client/js/<%= config.siteName %>.min.js'
                        ]
                    }
                ]
            }
        },

        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },

            css: {
                src: [
                    '<%= config.outDirectory %>/client/css/mechavian.min.css',
                    '<%= config.outDirectory %>/client/css/<%= config.siteName %>.min.css'
                ]
            },

            js: {
                src: [
                    '<%= config.outDirectory %>/client/js/ie.js',
                    '<%= config.outDirectory %>/client/js/<%= config.siteName %>.min.js',
                    '<%= config.outDirectory %>/client/js/vendor.min.js',
                    '<%= config.outDirectory %>/client/js/mechavian.min.js'
                ]
            }

        },

        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        filerev_replace: {
            options: {
                assets_root: '<%= config.outDirectory %>',
                views_root: '<%= config.outDirectory %>'
            },

            index: {
                src: '<%= config.outDirectory %>/client/index.html'
            }
        },
        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

        bump: {
            options: {
                updateConfigs: ['pkg'],

                // Set prerelease to user
                prereleaseName: 'dev',

                // Release settings
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],

                push: true,
                pushTo: 'origin',

                createTag: true
            }
        },

        karma: {
            options: {
                configFile: 'karma.config.js',
                files: require('./karma.files')
            },

            continuous: {
                options: {
                    singleRun: true,
                }
            },
            debug: {
                options: {
                    singleRun: false,
                    browsers: ['Chrome']
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.@(js|css|less|html)'],
                tasks: ['build'],
                options: {
                    livereload: true,
                    debounceDelay: 250
                }
            }
        },

        run: {
            npmStart: {
                cmd: 'npm.cmd',
                args: ['start'],
                options: {
                    cwd: '<%= config.outDirectory %>',
                    wait: false,
                    failOnError: true,
                    ready: /Server running at "(.*)"/i
                }
            }
        },

        open: {
            dev: {
                path: 'http://localhost:3000'
            }
        }
    });

    grunt.registerTask('buildCss', [
        'injector:less', // inject less imports and save to .tmp\less\app.less
        'less', // build mechavian.css to .tmp\css\mechavian.css & .tmp\css\mechavian.map.css
        'cssmin', // minify mechavian.css to mechavian.min.css
        'copy:css' // copy the css, min.css, and map.css to wwwroot\css\*
    ]);

    grunt.registerTask('buildJs', [
        'jshint', // Verify JS
        'jscs', // Verify JS Code Styles
        'ngtemplates', // build all angular template html files to .tmp\js\__templates.js
        'uglify', // concat & minify to .tmp\js\mechavian.min.js
        'copy:js' // copy to wwwroot\js\*
    ]);

    grunt.registerTask('buildHtml', [
        'preprocess:html', // replace variables & copy to output
        'injector:index', // inject mechavian.min.css & *.min.js
        'filerev',
        'filerev_replace'
    ]);

    grunt.registerTask('doBuild', [
        'log-pkg-version', // Output build number to console
        'copy:mechavianCore',
        'copy:staticFiles',
        'buildCss',
        'buildJs',
        'buildHtml'
    ]);

    grunt.registerTask('rebuild', [
        'bump-only:prerelease',
        'clean',
        'doBuild'
    ]);

    grunt.registerTask('build', [
        'bump-only:prerelease',
        'doBuild'
    ]);

    grunt.registerTask('test', ['karma:continuous']);

    grunt.registerTask('vstsBuild', [
        'prepare-vsts-build',
        'doBuild',
        'test'
    ]);

    grunt.registerTask('release', [
        'bump-only',
        'clean',
        'doBuild',
        'test',
        'bump-commit'
    ]);

    grunt.registerTask('serve', [
        'run:npmStart',
        'open:dev',
        'watch'
    ]);

    grunt.registerTask('default', [
        'rebuild',
        'test',
        'serve'
    ]);
};