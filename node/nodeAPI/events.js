var events = require('events');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('ApplicationStart', onApplicationStart);
eventEmitter.on('ApplicationRun', onApplicationRun);
eventEmitter.on('ApplicationStop', onApplicationStop);

function mainLoop() {
    eventEmitter.emit('ApplicationStart');
    eventEmitter.emit('ApplicationRun');
    eventEmitter.emit('ApplicationStop');
}


mainLoop();

function onApplicationStart() {
    console.log('application start~~~~~~~~~');
}

function onApplicationRun() {
    console.log('application is running~~~~~~');
}
function onApplicationStop() {
    console.log('application is stop');
}