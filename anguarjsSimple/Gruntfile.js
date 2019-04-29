
module.exports = function (grunt) {
    var target = grunt.option('target') || 'dev';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'directive/**/*.js',
                            'pages/**/*.js',
                            'services/**/*.js'
                        ],
                        ext: '.min.js'
                    }
                ]
            }
        },

        /**
         * for set project environment
         * environment contains development | production
         *
         * when run grunt in terminal load dev variable
         * when run grunt prod --target=prod load prod variable
         */
        config: {
            dev: {
                options: {
                    variables: {
                        'environment': 'development'
                    }
                }
            },
            prod: {
                options: {
                    variables: {
                        'environment': 'production'
                    }
                }
            }
        },




        /**
         * convert all js file from es6 to es5
         */
        babel: {
            options: {
                sourceMap: false
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: [
                            'directive/**/*.min.js',
                            'pages/**/*.min.js',
                            'services/**/*.min.js'
                        ],
                        dest: '',
                    }
                ]
            }
        },


        /**
         * for angular parameter in minify and uglify mode
         */
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: [

                    {
                        expand: true,
                        src: [

                            'directive/**/*.min.js',
                            'pages/**/*.min.js',
                            'services/**/*.min.js'
                        ],
                        dest: ''
                    }
                ]
            }

        },




        uglify: {
            prod:{
                options: {
                    compress: {
                        drop_console: true
                    }
                },
                files:[

                    {
                        expand: true,
                        src: [
                            'directive/**/*.min.js',
                            'pages/**/*.min.js',
                            'services/**/*.min.js'
                        ]
                    }
                ]
            },
            dev : {}
        }
    });


    /**
     * this task for sho time of any task run in grunt
     */
    require('time-grunt')(grunt, (stats, done) => {
        done();
    });


    /**
     * initialize all task need in grunt
     */
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-config');

    console.log("target : " , target);
    grunt.registerTask('default', ['config:'+target,'babel','ngAnnotate']);//,'uglify:'+target, ,'postcss'
    // grunt.registerTask('default', ['config:'+target,'babel']);//,'uglify:'+target, ,'postcss'
    grunt.registerTask('prod', ['config:'+target,'copy:main','babel','ngAnnotate','uglify:'+target ]);//,'uglify:'+target, ,'postcss','htmlmin'

};