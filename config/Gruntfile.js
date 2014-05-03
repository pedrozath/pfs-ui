module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        assemble: {
            options: {
                layoutdir: "../app/layouts",
                layout:    "default",
                layoutext: ".html",
                partials:  ["../app/partials/*.html"],
                helpers:   ["../config/helpers.js"],
                flatten:   true
            },

            dev: {
                options: { assets: "../temp/assets" },
                src: ["../app/pages/*.html"],
                dest: "../temp/"
            }
        },

        sass: {
            dev: {
                options: { style: "compact", sourcemap: true },
                files: { "../temp/assets/css/app.css": "../app/assets/sass/app.sass" },
            },
        },

        watch: {
            assemble: {
                files: [
                    "../app/layouts/*",
                    "../app/pages/*.html",
                    "../app/partials/*.html",
                    "../config/helpers.js"
                ],
                tasks: ["assemble:dev"]
            },

            assets: {
                files: ["../app/assets/**/*"],
                tasks: ["copy:dev"]
            },

            sass: {
                files: [
                    "../app/assets/sass/*",
                    "../app/assets/libs/*"
                ],
                tasks: ["sass:dev"]
            },

            livereload: {
                files: [
                    "../temp/**/*",
                    "../temp/assets/css/app.css"
                ],
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    keepalive: true,
                    livereload: true,
                    base: "../temp",
                    hostname: "*"
                }
            }
        },

        copy: {
            dev: {
                expand: true,
                cwd: "../app/assets",
                src: ["**/*"],
                dest: "../temp/assets/"
            }
        }

    });

    grunt.loadNpmTasks("assemble");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    
    grunt.registerTask("default", [
        "copy",
        "assemble",
        "sass"
    ]);

};