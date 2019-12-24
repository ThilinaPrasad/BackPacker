import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import { DBMeter } from '@ionic-native/db-meter/ngx';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  latitude: number;
  longitude: number;
  altitude: number;
  light: number;
  microphone: number;

  constructor(private geolocation: Geolocation, private sensors: Sensors, private dbMeter: DBMeter) {
    this.light = 0;
  }

  getCurrentPositionData() {
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
      this.altitude = data.coords.altitude;
    });
  }

  getLightSensorData() {
    this.sensors.disableSensor();
    this.sensors.enableSensor(TYPE_SENSOR.LIGHT);
    // this.sensors.enableSensor("LIGHT");
    setInterval(() => {
      this.sensors.getState().then((values) => {
        this.light = values[0];
      });
    }, 300);
  }

  getMicrophoneData() {
    setInterval(() => {
      // Start listening
      const subscription = this.dbMeter.start().subscribe(
        data => this.microphone = data
      );
    }, 1000);
  }

}