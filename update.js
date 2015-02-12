#!/usr/bin/env node

// Only update the www assets for fast iteration.

var path = require('path');
var cordovaLib = require('cordova-lib');
var AndroidProject = cordovaLib.AndroidProject;

// Legacy logging plumbing
cordovaLib.events.on('log', console.log);
cordovaLib.events.on('error', console.error);
cordovaLib.events.on('warn', console.warn);
cordovaLib.events.on('verbose', console.log);


var projDir = path.resolve('build');
var wwwDir = path.resolve('../cordova-mobile-spec/www');

var prj = new AndroidProject();
prj.open(projDir);
prj.copyWww(wwwDir);
prj.run();

// The other possibility for www assets will be to ask
// prj where to put them and have some gulp based streams
// output directly to there, this will be much faster for
// projects with large www dirs.


