var request = require('request');

var Accessory, Service, Characteristic;

module.exports = function(homebridge) {
	Accessory = homebridge.platformAccessory;
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	homebridge.registerAccessory('homebridge-sony-android-tv', 'SonyAndroidTV', SonyAndroidTV);
}

function SonyAndroidTV(log, config) {
	this.log = log;
	this.name = config.name || 'Sony TV';
	this.ip = config.ip;
	this.psk = config.psk;

	if(!this.ip)
		throw new Error('Your must provide IP address of the Sony TV.');

	if(!this.psk)
		throw new Error('Your must provide Pre-Shared Key of the Sony TV.');

	this.service = new Service.Switch(this.name);

	this.serviceInfo = new Service.AccessoryInformation();

	this.serviceInfo
		.setCharacteristic(Characteristic.Manufacturer, 'Sony')
		.setCharacteristic(Characteristic.Model, 'Android TV')
		.setCharacteristic(Characteristic.SerialNumber, '8280-63B8-FBC84A93BC4A');

	this.service
		.getCharacteristic(Characteristic.On)
		.on('get', this.getPowerState.bind(this))
		.on('set', this.setPowerState.bind(this));
}

SonyAndroidTV.prototype = {
	getPowerState: function(callback) {
		var log = this.log;

		request.post({
			url: 'http://' + this.ip + '/sony/system',
			headers: {
				'X-Auth-PSK': this.psk
			},
			form: JSON.stringify({
				method: 'getPowerStatus',
				params: [],
				id: 1,
				version: '1.0'
			})
		}, function(error, response, body){
			if(!error && response.statusCode == 200){
				var json = JSON.parse(body);

				log.debug('Status: ' + json.result[0].status);
				callback(null, (json.result[0].status == 'active'));
				return;
			}

			log.debug('Error getting power state. [%s] %s', response.statusCode, error);

			callback();
		});
	},

	setPowerState: function(state, callback){
		var log = this.log;

		request.post({
			url: 'http://' + this.ip + '/sony/system',
			headers: {
				'X-Auth-PSK': this.psk
			},
			form: JSON.stringify({
				method: 'setPowerStatus',
				params: [{
					'status': Boolean(state)
				}],
				id: 1,
				version: '1.0'
			})
		}, function(error, response, body){
			if(!error && response.statusCode == 200){
				var json = JSON.parse(body);

				if(!json.error)
					return;

				log.debug('API Error: %s', json.error[1]);
				return;
			}

			log.debug('Error setting power state. [%s] %s', response.statusCode, error);
		});

		callback();
	},

	identify: function(callback) {
		callback();
	},

	getServices: function() {
		return [this.serviceInfo, this.service];
	}
};
