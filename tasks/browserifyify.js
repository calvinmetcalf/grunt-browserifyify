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
function rename(code,tokenFrom, tokenTo){
		var ast = esprima.parse(code);
		estraverse.traverse(ast,{
		    leave:function(node, parent) {
		        if (node.type == 'Identifier'&&node.name===tokenFrom){
		            node.name = tokenTo;
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
      tokenFrom:'require',
      tokenTo:'___forBrowserify'+Math.random()+'___'
    });

    grunt.file.write(options.file,rename(grunt.file.read(options.file),options.tokenFrom,options.tokenTo));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" renamed.');
    });

};
