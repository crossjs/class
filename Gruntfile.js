/*
 * modules
 * https://github.com/crossjs/modules
 *
 * Copyright (c) 2013 crossjs
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['src/*.js'],
      options: {
        jshintrc: true
      }
    },

    qunit: {
      all: ['test/*.html']
    },

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        options: {
          paths: 'src',
          outdir: 'doc',
          themedir: 'vendor/yuidoc-bootstrap'
        }
      }
    },

    clean: {
      pages: {
        files: {
          src: ['gh-pages/**', '!.git/', '!.gitignore']
        }
      },
      doc: {
        files: {
          src: ['doc/**']
        }
      },
      dist: {
        files: {
          src: ['dist/**']
        }
      }
    },

    copy: {
      doc: {
        files: [ {expand: true, cwd: 'doc/', src: ['**'], dest: 'gh-pages/'} ]
      }
    },

    transport: {
      options: {
        debug: true,
        idleading: '<%= pkg.family %>/<%= pkg.name %>/<%= pkg.version %>/',
        alias: '<%= pkg.spm.alias %>'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*.js'],
          dest: 'dist/',
          ext: '.js'
        }]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
        beautify: {
          'ascii_only': true
        },
        // mangle: true,
        compress: {
          'global_defs': {
            'DEBUG': false
          },
          'dead_code': true
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['*.js', '!*-debug.js'],
          dest: 'dist/',
          ext: '.js'
        }]
      }
    }

  });

  grunt.registerTask('build', ['clean:dist', 'transport', 'uglify']);

  grunt.registerTask('doc', ['yuidoc', 'clean:pages', 'copy', 'clean:doc']);

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['test', 'doc', 'build']);

};