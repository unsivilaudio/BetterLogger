# Better Logger

#### A SIMPLE LOGGING SOLUTION

</br>

## Installation

`npm install --save express-better-logger`
</br>
</br>

## Usage

```
const Logger = require('better-logger');
const log = new Logger('ServiceName');

// Log an INFO message
log.info('This is an info message');

// Log an ERROR message
log.error('This is an error message');

// Log an WARN message
log.warn('This is an warn message');
```

</br>
</br>

_Current Message Format_

[type][date][servicename] [message]

> [INFO][2022-03-29T14:52:15.720Z][SERVICENAME] This is an info message.

## Options

The logger receives an optional options object as the 2nd parameter.

|  @param   |  @type  | Default | Note                                                    |
| :-------: | :-----: | :-----: | :------------------------------------------------------ |
|  file  | boolean |  FALSE  | enable file logging                                     |
|  path  | string  |  NULL   | required with `file`, __absolute path__ to store log files |
|  UTC   | boolean |  TRUE   | enable log time in UTC                                  |
| colors | object  |  null   | define the log colors <sup>[props](#color)</sup>        |

<span id='color' />

> info: \<string\> _default_ - yellow </br>
> error: \<string\> _default_ - red </br>
> warn: \<string\> _default_ - white </br>
> date: \<string\> _default_ - magenta </br>

#### Available Colors

bright | red | green | yellow | blue | magenta | cyan | white

## Issues

Please use the issue tracker to report issues with the project. My sincerest thanks to all you beta testers. 🥂
