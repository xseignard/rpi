'use strict';
var chai = require('chai'),
	expect = chai.expect,
	GPIO = require('../../src/lib/gpio'),
	execStub = require('../exec.stub'),
	gpio, exec;

describe('GPIO', function() {
	beforeEach(function(){
		exec = execStub();
	});

	afterEach(function(){
		exec.restore();
	});

	it('Should be correctly instanciated', function(done) {
		gpio = new GPIO(8, 'out');
		gpio.on('ready', function() {
			expect(gpio.pinNumber).to.equal(8);
			expect(gpio.direction).to.equal('out');
			expect(exec.cmd).to.equal('gpio mode 8 out');
			done();
		});
	});
});