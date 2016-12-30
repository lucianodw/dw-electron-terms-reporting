'use strict';

var electron = require('electron');
var {app, BrowserWindow} = electron;
var ipc = require('electron').ipcMain;
var mongoose = require('mongoose');
var Legal = require('./app/legal.model');

var mainWindow = null;

var isRenderer = (process && process.type === 'renderer');
console.log('isRenderer main.js', isRenderer);

app.on('ready', function() {

    mainWindow = new BrowserWindow({
        height: 800,
        width: 1200
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');


    var uri = 'mongodb://dw_legal_admin:3Re*x48B@aws-us-east-1-portal.20.dblayer.com:10232/legal-app';
    var defaults = {};
    mongoose.connect(uri, defaults);

    mainWindow.on('closed', function() {
      mainWindow = null;
    });

});

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

ipc.on('search-legal', function(event) {
  console.log('searching...');
  Legal.find({}, function(err, results){
    if(err) {
      return err;
    }

    console.log('complete!');

    var report = {
      title: 'Opt-in Terms & Conditions Reporting',
      totals: results.length
    };
    
    event.sender.send('search-legal-results', report);
  });

  // mongoose.connection.on('error', err => { ... });
});
