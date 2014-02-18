
var NodeSyslogLoggerSimple = require("./node-syslog-logger-simple");

// if no modules loaded, local instance will do
//var logger = new NodeSyslogLoggerSimple();

// create global logger for all modules
global.logger = new NodeSyslogLoggerSimple();


function after (err) {
	if ( err ) {
		console.error('didnt get trough to syslog',err);
	} else {
		console.log('ok');
	}
};

//logger.emergency('test=emergency ', after);
logger.alert('test=alert',after);
logger.critical('test=critical',after);
logger.error('test=error',after);
logger.warning('test=warning',after);
logger.notice('test=notice',after);
logger.info('test=info',after);
