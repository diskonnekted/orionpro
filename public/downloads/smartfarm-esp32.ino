/*
  Orion Pro Smart Farm - ESP32 Telemetry Client
  
  This sketch connects an ESP32 to WiFi and sends sensor data to the Orion Pro server.
  
  Required Libraries:
  - DHT sensor library by Adafruit
  - Adafruit Unified Sensor
  - ArduinoJson
  
  Hardware Connections:
  - DHT11/22 Data Pin -> GPIO 4
  - Soil Moisture Analog -> GPIO 34
  - LDR Analog -> GPIO 35
  - LED (Status) -> GPIO 2
*/

#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

// ==========================================
// CONFIGURATION - EDIT THIS SECTION
// ==========================================

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Server URL (Use IP address if local, or domain name)
// Example: http://192.168.1.10:3000/api/iot/telemetry
const char* serverUrl = "http://YOUR_SERVER_IP:3000/api/iot/telemetry";

// Device Token (Get this from Orion Pro Admin Panel -> IoT Device Manager)
const char* deviceToken = "YOUR_DEVICE_TOKEN_HERE";

// Sensor Configuration
#define DHTPIN 4
#define DHTTYPE DHT11 // Change to DHT22 if using DHT22
#define SOIL_PIN 34
#define LDR_PIN 35

// Upload Interval (milliseconds)
const long interval = 10000; // 10 seconds

// ==========================================

DHT dht(DHTPIN, DHTTYPE);
unsigned long previousMillis = 0;

void setup() {
  Serial.begin(115200);
  pinMode(2, OUTPUT); // Built-in LED
  
  dht.begin();
  
  Serial.println("\n--- Orion Pro Smart Farm IoT ---");
  connectWiFi();
}

void loop() {
  unsigned long currentMillis = millis();
  
  // Check WiFi connection
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }
  
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    sendTelemetry();
  }
}

void connectWiFi() {
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    digitalWrite(2, !digitalRead(2)); // Blink LED
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    digitalWrite(2, HIGH); // LED On
  } else {
    Serial.println("\nWiFi connection failed. Will retry...");
    digitalWrite(2, LOW); // LED Off
  }
}

void sendTelemetry() {
  digitalWrite(2, LOW); // Blink off indicating sending
  
  // 1. Read Sensors
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  int soilRaw = analogRead(SOIL_PIN);
  int ldrRaw = analogRead(LDR_PIN);
  
  // Map raw analog values to percentage (adjust based on calibration)
  // Soil: 4095 (dry) -> 0 (wet) typically, or vice versa depending on sensor
  // Here we assume 4095 is dry (0%) and 1500 is wet (100%)
  int soilPercent = map(soilRaw, 4095, 1500, 0, 100);
  soilPercent = constrain(soilPercent, 0, 100);
  
  int lightLux = map(ldrRaw, 0, 4095, 0, 1000); // Rough approximation
  
  // Check if reading failed
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  
  // 2. Prepare JSON Payload
  StaticJsonDocument<200> doc;
  doc["temperature"] = t;
  doc["humidity"] = h;
  doc["soil_moisture"] = soilPercent;
  doc["light_intensity"] = lightLux;
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  // 3. Send HTTP POST Request
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", String("Bearer ") + deviceToken);
  
  Serial.println("Sending data: " + jsonString);
  
  int httpResponseCode = http.POST(jsonString);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.print("Server Response: ");
    Serial.println(httpResponseCode);
    Serial.println(response);
  } else {
    Serial.print("Error on sending POST: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();
  digitalWrite(2, HIGH); // LED On indicating done
}
