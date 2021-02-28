# IoT Environment Monitor

A simple IoT project to manage environment temperature and humidity.

## Main Features

* Capture and send temperature and humidity from environment and store it into a server;
* Access the data in the app;

### Prerequisites
It is important that you have knowledge in microcontroller programming, and experience in assembling circuits. 

To reproduce the circuit, you will need:

* 1x Breadboard
* 1x ESP01
* 1x DTH11/DTH22 Temperature and Humidity Sensor
* 1x 10k ohm resistor
* 1x FTDI/USB to TTL adapter
* Jumpers (rigid or flexible)

In this case, I use a 9VDC font with a 3.3VDC voltage regulator. You can use a different configuration to power the circuit, as long as the ESP01 and the sensor receive 3.3VDC.


**Notes**:
1. You can choose another microcontroller of your choice. However, you may need to make some changes to the code.
2. To build the app, is recommended to use the Android Studio IDE and is required to have installed the Flutter plugin.
3. To program the microcontroller, it is recommended to use the Arduino IDE, and [install the ESP01 board](http://arduino.esp8266.com/stable/package_esp8266com_index.json) in the Arduino IDE.
4. To run the api, it is necessary to have installed the  [NodeJS](https://nodejs.org) framework

### Installing

#### API

1. Open terminal inside the folder `/api`
2. Run `npm install` to install the dependencies.
3. Run `npm run start:dev` to build project.

#### APP

1. Open the folder app in Android Studio IDE.
2. In file `home_page.dart` located in `app/lib/home_page.dart`, change the `url` url in `_getData()`  method with the host and port from api and the path from get data. Ex: `http://192.168.1.10/environments/last`. 
3. Build the app. You can use an Emulator Device or your own device.


**Observation** - 
 I recommend that you use [ngrok.io](https://ngrok.io) to create an HTTPs tunnel, which is pointing to the local host API. 

#### ESP32

To install the application on the microcontroller, make sure the ESP32 board it's configured in the Arduino IDE. After that, follow these steps:
1. Rename the file `arduino_secrets_example.h` located in `/esp01`to `arduino_secrets.h`
2. Open the file `arduino_secrets.h` with your favorite text editor
3. In field `SECRET_SSID`, put your SSID network address (2.4GHz required).
4. In field `SECRET_PASS`, put your network password.
5. In field `SERVER_URL`, put the host and port the API is running and the path that data will be submitted. Example: `http://192.168.1.10/environments`. Save and close the text editor.
6. Open the `esp01.ino` file located in `/esp01` with Arduino IDE
7. In `#define DHTTYPE DHT11`, if you are using a DTH22 sensor, replace DTH11 with DTH22. Otherwise, keep it as is.
8. Click on `Tools -> Board ->` and select `Generic ESP8266 Module`
9. Connect the ESP01 using the FTDI adapter
10. Click on `Tools -> Port` and select the port that ESP32 is connected
11. click on `Sketch -> Upload`

**Observation**:

See [here](https://www.instructables.com/Getting-Started-With-Esp-8266-Esp-01-With-Arduino-/) how to make the code upload in ESP01 using the FTDI adapter.

### Assembling of the electronic circuit

After load the sketch, the circuit can be assembled according to the image below:

![Circuit](https://github.com/lucasrochagit/iot-env-monitor/blob/main/images/circuit.png)


## Built With

* [Arduino IDE](http://arduino.cc) - The framework used to build ESP32 code.
* [Android Studio](https://developer.android.com/studio) - The framework used to build App.
* [NodeJS](https://nodejs.org) - The framework used to build and run API.

## Authors

* **Lucas Rocha** - *Initial work* 

## License

This project is licensed under the Apache License - see the [LICENSE.md](LICENSE) file for details