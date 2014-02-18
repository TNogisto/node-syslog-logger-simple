/*
// log to stdout or stderr
// if no tty, logs to syslog
// 
// log funcs from debug to emergency
// see https://www.ietf.org/rfc/rfc3164.txt

var NodeSyslogLoggerSimple = require('node-syslog-logger-simple');

log = new NodeSyslogLoggerSimple();

function after (err) {
	if ( err ) {
		console.log('didnt get trough to syslog',err);
	}
};
var test= 'emergency'
logger.emergency(, after);
// fill produce 
logger.alert('test=alert',after);
logger.critical('test=critical',after);
logger.error('test=error',after);
logger.warning('test=warning',after);
logger.notice('test=notice',after);
logger.info('test=info',after);

*/

var nodeSyslogLogger = require('node-syslog-logger');

var LOG_SYSLOG = (5<<3);

var LOG_EMERG = 0;
var LOG_ALERT = 1;
var LOG_CRIT = 2;
var LOG_ERR	= 3;
var LOG_WARNING	= 4;
var LOG_NOTICE= 5;
var LOG_INFO = 6;
var LOG_DEBUG = 7;

var LEVELS = [];
LEVELS[LOG_EMERG] = 'EMERGENCY';
LEVELS[LOG_ALERT] = 'ALERT';
LEVELS[LOG_CRIT] = 'CRITICAL';
LEVELS[LOG_ERR] = 'ERROR';
LEVELS[LOG_WARNING] = 'WARNING';
LEVELS[LOG_NOTICE] = 'NOTICE';
LEVELS[LOG_INFO] = 'INFO';
LEVELS[LOG_DEBUG] = 'DEBUG';


module.exports = nodeSyslogLoggerSimple;

function nodeSyslogLoggerSimple (_options) {

	var options = _options || {};
	this._tag = options.tag || process.title;
	this._level = options.level || LOG_NOTICE;
	this._facility = options.facility || LOG_SYSLOG;
	this._syslog = null;
	this._pid = process.pid;
	if ( !process.stdout.isTTY ) { // no tty, going to syslog
		this._syslog = new nodeSyslogLogger({tag:this._tag, level:this._level, facility:this._facility});
	}
	
}


nodeSyslogLoggerSimple.prototype._log =  function (level,msg,cb) {

	var _cb = cb || function(e,r) {};
	if ( !msg ) return cb(null);
	if ( !process.stdout.isTTY ) { 
		if ( !this._syslog) {
			this._syslog = new nodeSyslogLogger({tag:this._tag, level:this._level, facility:this._facility});
		}
		this._syslog._log(level,msg,cb);
	} else {
		var _now = new Date().toISOString();
		var _msg = _now + ' ' + this._tag + '[' + this._pid + ']: level=' + LEVELS[level] + '; ' + msg;
		if ( this._level <= LOG_ERR) {
			console.error(_msg);
		} else {
			console.log(_msg);
		}
	}

};


nodeSyslogLoggerSimple.prototype.emergency = function (msg, cb) {

	if ( LOG_EMERG <= this._level ) {
		this._log(LOG_EMERG, msg, cb);
	} else {
		return cb(null);
	}

};


nodeSyslogLoggerSimple.prototype.alert = function (msg, cb) {

	if ( LOG_ALERT <= this._level ) {
		this._log(LOG_ALERT, msg, cb);
	} else {
		return cb(null);
	}

};


nodeSyslogLoggerSimple.prototype.critical = function (msg, cb) {

	if ( LOG_CRIT <= this._level ) {
		this._log(LOG_CRIT, msg, cb);
	} else {
		return cb(null);
	}

};


nodeSyslogLoggerSimple.prototype.error = function (msg, cb) {

	if ( LOG_ERR <= this._level ) {
		this._log(LOG_ERR, msg, cb);
	} else {
		return cb(null);
	}

};


nodeSyslogLoggerSimple.prototype.warning = function (msg, cb) {

	if ( LOG_WARNING <= this._level ) {
		this._log(LOG_WARNING, msg, cb);
	} else {
		return cb(null);
	}

};


nodeSyslogLoggerSimple.prototype.notice = function (msg, cb) {

	if ( LOG_NOTICE <= this._level ) {
		this._log(LOG_NOTICE, msg, cb);
	} else {
		return cb(null);
	}

};


nodeSyslogLoggerSimple.prototype.info = function (msg, cb) {

	if ( LOG_INFO <= this._level ) {
		this._log(LOG_INFO, msg, cb);
	} else {
		return cb(null);
	}

};


nodeSyslogLoggerSimple.prototype.debug = function (msg, cb) {

	if ( LOG_DEBUG <= this._level ) {
		this._log(LOG_DEBUG, msg, cb);
	} else {
		return cb(null);
	}

};
