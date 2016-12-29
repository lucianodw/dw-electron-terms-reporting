'use strict'
var Legal = require('./legal.model');
var ipc = require('electron').ipcRenderer;

module.exports = {
  init: function() {
    
    // Temporary, replace with date picker
    var today1 = new Date();
    var today2 = new Date();
    today1.setDate(today1.getDate() - 3);
    today2.setDate(today2.getDate() - 9);
    
    var date = this.createISODate(today1, today2);
    this.search(date.startDateISO, date.endDateISO);
  },
  createISODate: function(startDate, endDate) {
    
    var startDateISO = startDate.toISOString();
    var endDateISO = endDate.toISOString();
    
    return {
      startDateISO: startDateISO,
      endDateISO: endDateISO
    };
  },
  search: function(startDateISO, endDateISO) {
    console.log('startDateISO',startDateISO.toLocaleString());
    console.log('endDateISO',endDateISO.toLocaleString());
    ipc.send('search-legal');
  }
}