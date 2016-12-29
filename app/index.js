var electron = require('electron');
var $ = require('jquery');
var termsReport = require('./terms-report');

var isRenderer = (process && process.type === 'renderer')
console.log('isRenderer', isRenderer);

console.log('Gonna do stuff in the browser!!!');

$(document).ready(function() {
  $('.pull-report-btn').click(function() {
    termsReport.init();
  });
});