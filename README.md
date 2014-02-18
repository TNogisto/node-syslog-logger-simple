node-syslog-logger-simple
=========================

> in short: if no tty, log to syslog, else to stdin || stderr

usefull in early devel, when debug messages on console are needed   

later, when logs are meant for machine to read,  use just node-syslog-logger


sorry, not sexy and sorry, brain's are needed

please read https://www.ietf.org/rfc/rfc3164.txt


## install

> depends on node-syslog-logger && node-syslog


```

npm install https://github.com/hillar/node-syslog-logger-simple/archive/master.tar.gz

```

## use


```

var NodeSyslogLoggerSimple = require("node-syslog-logger-simple");

var logger = new NodeSyslogLoggerSimple();

logger.notice('action=loggin; user=hillar');


```
