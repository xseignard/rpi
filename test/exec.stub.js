var proc = require('child_process'),
	sinon = require('sinon');

var execStub = function() {
	var _self = this;
	return sinon.stub(proc, 'exec', function(cmd, callback) {
		_self.cmd = cmd;
		callback();
	});
};

module.exports = execStub;
