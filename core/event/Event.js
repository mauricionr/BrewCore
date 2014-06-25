/*
 * Event
 *
 * @module Event
 */

var EventEmitter = require('events').EventEmitter;
var coreEmitter = new EventEmitter();

var core1 = require('../device').core1;

var Logger = require('../module/Logger');
var LOG = 'Event';

var Brewer = require('../brewer');

exports.brewer = {};
exports.temperature = {};


/*
 * Brew changed
 *
 */
exports.brewer.brewChanged = function (brew) {
  coreEmitter.emit('brew:changed', brew);
};


/*
 * Brew ended
 *
 */
exports.brewer.ended = function () {
  coreEmitter.emit('brew:ended');
};


/*
 * Brew status changed (pause)
 *
 */
exports.brewer.statusChanged = function (status) {
  coreEmitter.emit('brew:status', status);
};


/*
 * Brew phase changed
 *
 */
exports.brewer.phaseChanged = function (phase) {
  coreEmitter.emit('brew:phase', phase);
};



/*
 * Temperature changed
 *
 */
exports.temperature.changed = function (temperature) {
  Brewer.onTempUpdate(temperature);

  coreEmitter.emit('temperature:changed', temperature);
};


/*
 * PWM changed
 */
core1.on('pwmInfo', function(info) {
  var pwm = info.data;

  Logger.silly('PWM updated', LOG, { pwm: pwm });

  coreEmitter.emit('pwm:changed', pwm);
});


exports.emitter = coreEmitter;
