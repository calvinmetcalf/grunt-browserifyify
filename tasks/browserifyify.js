/*
 * grunt-browserifyify
 * https://github.com/calvin/grunt-browserifyify
 *
 * Copyright (c) 2013 Calvin Metcalf
 * Licensed under the MIT license.
 */
var estraverse = require('estraverse');
var esprima = require('esprima');
var escodegen = require('escodegen');
'use strict';
function rename(code,token){
		var ast = esprima.parse(code);
		estraverse.traverse(ast,{
		    leave:function(node, parent) {
		        if (node.type == 'Identifier'&&node.name===token){
		            node.name = '___forBrowserify___';
		        }
		    }
		});
		return escodegen.generate(ast);
	}
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('browserifyify', 'edit out \'require\' variables in optimized r.js projects', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', ',
      token:'require'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return rename(grunt.file.read(filepath),options.token);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
