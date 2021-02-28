#include <DHT.h>
#include "arduino_secrets.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define DHTPIN 0
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

WiFiClient client;
HTTPClient http;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  startWifi();
  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  if (isnan(temp) || isnan(hum)){
    Serial.println(F("Failed to read from DHT sensor!"));
    delay(1000);
    return;
  }
  
  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.print("°C - Humidity: ");
  Serial.print(hum);
  Serial.println("%"); 

  sendData(temp, hum);
  
  delay(30000);
}

void startWifi() {
  WiFi.begin(SECRET_SSID, SECRET_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("WiFi connection successful. Ip Address: ");
  Serial.println(WiFi.localIP());
}


void sendData(float temp, float hum) {
  http.begin(SERVER_URL);
  http.addHeader("Content-Type", "application/json");
  String body = "{\"temperature\":" + String(temp) + ",\"humidity\":" + String(hum) + "}" ;
 
  int http_code = http.POST(body);

  String res =  http.getString();
  
  Serial.print("HTTP ");
  Serial.print(http_code); 
  Serial.print("RESPONSE: ");
  Serial.println(res);
  
  http.end();
}
