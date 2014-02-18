node-syslog-logger-simple
=========================

> in short: if no tty, log to syslog, else to stdin || stderr

usefull in early devel, when debug messages on console are needed   

later, when logs are meant for machine to read,  use just node-syslog-logger


sorry, not sexy and sorry, brain's are needed

please read https://www.ietf.org/rfc/rfc3164.txt

please see https://github.com/schamane/node-syslog


## install

> depends on node-syslog-logger && node-syslog


```

npm install https://github.com/hillar/node-syslog-logger-simple/archive/master.tar.gz

```

## use


```

var NodeSyslogLoggerSimple = require("node-syslog-logger-simple");

global.logger = new NodeSyslogLoggerSimple();

logger.notice('action=loggin; user=hillar');


```



```
#$ node node_modules/node-syslog-logger-simple/test-node-syslog-logger-simple.js 
2014-02-18T19:13:54.189Z node[74666]: level=ALERT; test=alert
2014-02-18T19:13:54.192Z node[74666]: level=CRITICAL; test=critical
2014-02-18T19:13:54.192Z node[74666]: level=ERROR; test=error
2014-02-18T19:13:54.192Z node[74666]: level=WARNING; test=warning
2014-02-18T19:13:54.192Z node[74666]: level=NOTICE; test=notice

#$ node node_modules/node-syslog-logger-simple/test-node-syslog-logger-simple.js | head
ok
ok
ok
ok
ok
ok

#$ tail -7 /var/log/system.log
Feb 18 21:14:03 noname-2 node[74667]: action=start; log_level=5; log_facility=40;
Feb 18 21:14:03 noname-2 node[74667]: test=alert
Feb 18 21:14:03 noname-2 node[74667]: test=critical
Feb 18 21:14:03 noname-2 node[74667]: test=error
Feb 18 21:14:03 noname-2 node[74667]: test=warning
Feb 18 21:14:03 noname-2 node[74667]: test=notice
Feb 18 21:14:03 noname-2 node[74667]: action=exit; exit_code=0;
