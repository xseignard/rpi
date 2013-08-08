var util = require('util'),
	EventEmitter = require('events').EventEmitter,
	proc = require('child_process'),
	gpio = 'gpio';

var gpioEventNames = {
	ready : 'ready',
	change : 'change'
};

var GPIO = function(pinNumber, direction) {
	var _self = this;
	_self.pinNumber = pinNumber;
	_self.direction = direction;
	currentValue = -1;

	proc.exec([gpio, 'mode', pinNumber, direction].join(' '), function(error, stdout, stderr) {
		if (error) throw new Error(stderr);
		_self.emit(gpioEventNames.ready);
		if (_self.direction === 'in') {
			setInterval(function() {
				_self.read(function(value) {
					if (currentValue !== value) {
						currentValue = value;
						_self.emit(gpioEventNames.change, currentValue);
					}
				});
			}, 100);
		}
	});
};
util.inherits(GPIO, EventEmitter);


GPIO.prototype.write = function(value, callback) {
	if (this.direction !== 'out') throw new Error('The pin is not configured in "out" mode');
	proc.exec([gpio, 'write', this.pinNumber, value].join(' '), function(error, stdout, stderr) {
		if (error) throw new Error(stderr);
		if (typeof callback === 'function') callback();
	});
};

GPIO.prototype.high = function(callback) {
	this.write(1, callback);
};

GPIO.prototype.low = function(callback) {
	this.write(0, callback);
};

GPIO.prototype.read = function(callback) {
	proc.exec([gpio, 'read', this.pinNumber].join(' '), function(error, stdout, stderr) {
		if (error) throw new Error(stderr);
		if (typeof callback === 'function') callback(stdout);
	});
};

module.exports = GPIO;




