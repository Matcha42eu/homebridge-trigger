'use strict'

let Service, Characteristic, HomebridgeAPI, UUIDGen

module.exports = (homebridge) => {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
  HomebridgeAPI = homebridge
  UUIDGen = homebridge.hap.uuid

  homebridge.registerAccessory("homebridge-trigger-matcha", "FakeTriggerMatcha", FakeTrigger);
}

class FakeTrigger {
  constructor(log, config) {
    this.log = log
    this.name = config.name
    this.interval = config.interval < 60 ? 60000 : config.interval * 1000 // Lets not flood HomeKit
  
    this._sensor = new Service.ContactSensor(this.name)
    this._sensor.contactState = false
    this._sensor.getCharacteristic(Characteristic.ContactSensorState)
      .on('get', (callback) => {
        //this.log(`Gettings state ${this._sensor.contactState}`)
        callback(null, this._sensor.contactState)
      })
    

    setInterval( () => {
      // Change sensor state every this.interval seconds
      this._sensor.contactState = !this._sensor.contactState
      //this.log(`Setting state to ${this._sensor.contactState}`)
      this._sensor.setCharacteristic(Characteristic.ContactSensorState, this._sensor.contactState)
    }, this.interval)
      
      
// dirty hack
      
        this.name2 = config.name2
        this.interval2 = config.interval2 < 60 ? 60000 : config.interval * 1000 // Lets not flood HomeKit
      
        this._sensor2 = new Service.ContactSensor(this.name2)
        this._sensor2.contactState = false
        this._sensor2.getCharacteristic(Characteristic.ContactSensorState)
          .on('get', (callback) => {
            //this.log(`Gettings state ${this._sensor.contactState}`)
            callback(null, this._sensor2.contactState)
          })
        

        setInterval( () => {
          // Change sensor state every this.interval seconds
          this._sensor2.contactState = !this._sensor2.contactState
          //this.log(`Setting state to ${this._sensor.contactState}`)
          this._sensor2.setCharacteristic(Characteristic.ContactSensorState, this._sensor2.contactState)
        }, this.interval2)



  }

  getServices () {
      return [this._sensor, this._sensor2]
  }
}
