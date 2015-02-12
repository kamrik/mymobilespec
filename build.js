#!/usr/bin/env node

// prerequisites:
// put this file and package.json in a dir that is a sibling of cordova-android and core plugins
// npm install
// npm link cordova-lib where the api branch is checked out from
// https://github.com/kamrik/cordova-lib/tree/api


var path = require('path');
var shell = require('shelljs');

// This should be eventaually replaced with
// var AndroidProject = require('cordova-android');
var cordovaLib = require('cordova-lib');
var AndroidProject = cordovaLib.AndroidProject;

// Legacy logging plumbing
cordovaLib.events.on('log', console.log);
cordovaLib.events.on('error', console.error);
cordovaLib.events.on('warn', console.warn);
cordovaLib.events.on('verbose', console.log);

// Assuming this file lives in a dir that is a sibling of all the core plugins and cordova-android.
var platformTemplateDir = path.resolve('../cordova-android');
var pluginsDir = path.resolve('../');
var projDir = path.resolve('build');
var wwwDir = path.resolve('../cordova-mobile-spec/www');

// Using modified copy cause API version can't handle splashscreen for now.
var configXml = path.resolve('config.xml');


// Nuke the old build dir
shell.rm('-rf', projDir);


var prj = new AndroidProject();

// Run `create` script from the platform template
prj.init(platformTemplateDir, projDir);

// Add all plugins from the parent dir and tests contained in them.
prj.addPluginsFrom(pluginsDir, {addtests: true});

// Load and apply config.xml
var cfg = new cordovaLib.ConfigParser(configXml);
prj.updateConfig(cfg);

// Copy www dir
prj.copyWww(wwwDir);

// save is currently a noop, but may be needed later, and/or might be implied by
// build or run.
prj.save();

// Build / run
prj.build();

