import Link from 'next/link';

export default function IoTManualPage() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/admin/iot" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Device Manager
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">IoT Connection Guide</h1>
        <p className="text-slate-600 mt-2">How to connect your ESP32 to Orion Pro Smart Farm</p>
      </div>

      <div className="space-y-8">
        {/* Step 1: Hardware */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
            Hardware Setup
          </h2>
          <div className="prose prose-slate max-w-none">
            <p>Connect your sensors to the ESP32 board as follows:</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li><strong>DHT11/22 (Temp & Humidity):</strong> Data Pin to <code>GPIO 4</code></li>
              <li><strong>Soil Moisture Sensor:</strong> Analog Output to <code>GPIO 34</code></li>
              <li><strong>LDR (Light Sensor):</strong> Analog Output to <code>GPIO 35</code></li>
              <li><strong>Power:</strong> 3.3V or 5V (depending on sensors)</li>
              <li><strong>Ground:</strong> Common Ground (GND)</li>
            </ul>
          </div>
        </section>

        {/* Step 2: Software */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
            Software & Code
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">1. Install Arduino IDE</h3>
              <p className="text-slate-600">Download and install Arduino IDE if you haven't already. Add ESP32 board support in Preferences.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">2. Install Libraries</h3>
              <p className="text-slate-600 mb-2">Go to <strong>Sketch &gt; Include Library &gt; Manage Libraries</strong> and install:</p>
              <ul className="list-disc pl-5 text-slate-600 bg-slate-50 p-4 rounded-lg">
                <li><code>DHT sensor library</code> by Adafruit</li>
                <li><code>Adafruit Unified Sensor</code></li>
                <li><code>ArduinoJson</code> by Benoit Blanchon</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">3. Download Sketch</h3>
              <p className="text-slate-600 mb-4">Download the ready-to-use ESP32 code:</p>
              <a 
                href="/downloads/smartfarm-esp32.ino" 
                download
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download smartfarm-esp32.ino
              </a>
            </div>
          </div>
        </section>

        {/* Step 3: Configuration */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
            Configuration
          </h2>
          <div className="prose prose-slate max-w-none">
            <p>Open the downloaded file in Arduino IDE and edit the configuration section:</p>
            
            <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4 mb-4">
<pre>{`// ==========================================
// CONFIGURATION - EDIT THIS SECTION
// ==========================================

const char* ssid = "YOUR_WIFI_SSID";         // Enter your WiFi Name
const char* password = "YOUR_WIFI_PASSWORD"; // Enter your WiFi Password

// Server URL (If testing locally, use your PC's IP address)
// Example: http://192.168.1.10:3000/api/iot/telemetry
const char* serverUrl = "http://YOUR_SERVER_IP:3000/api/iot/telemetry";

// Device Token (Get this from Device Manager)
const char* deviceToken = "YOUR_DEVICE_TOKEN_HERE";`}</pre>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700 text-sm">
                <strong>Important:</strong> If running locally (localhost), do not use <code>localhost</code> in the ESP32 code. Use your computer's IP address (e.g., <code>192.168.x.x</code>).
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
