# grunt-browserifyify

> edit out 'require' variables in optimized r.js projects

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-browserifyify --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-browserifyify');
```

## The "browserifyify" task

### Overview
In your project's Gruntfile, add a section named `browserifyify` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  browserifyify: {
    options: {
      file:'path/to/file'
    }
  },
})
```

### Options

#### options.tokenFrom
Type: `String`
Default value: `require`

what should be replaced.

#### options.tokenTo
Type: `String`
Default value: '___bff'+(''+Math.random()).slice(2)+'___'

what it is turned into, I have no idea why I choose that value
