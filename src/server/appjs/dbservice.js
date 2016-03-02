    "use strict";
    var mysql = require('mysql');
    var async = require('async');
    var fs = require("fs");
    var uuid = require('node-uuid');
    var _  = require('lodash');
    var appdata = require('./appdata.js');

    var rooms = function(res) {
        appdata.mysqlconn.query("SELECT * from rooms", function(err, rows, fields) {
            if(err) {
                console.log('error=',err);
            } else {
                res.send(rows);
            }
        });
    };

    module.exports = {
        rooms: rooms
    }