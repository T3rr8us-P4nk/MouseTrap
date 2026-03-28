<h1 align="center">Mouse Trap</h1>
<p align="center">
A simple experimental project built with Vue and Capacitor that gathers device information.
<br>(https://www.youtube.com/@imjcdev)
</p>

## Features:
1. Battery Information: 
  - Battery Level
  - Is Charging
2. Device Information: 
  - Operating System
  - OS Versioin
  - Model
  - Manufacturer
  - Platform
  - Webview Version
  - Virtual
3. Geolocation:
  - Accuracy
  - Altitude
  - Heading
  - Latitude
  - Longitude
4. Sim Card Information:
  - Carrier Name
  - Iso Country Code
  - Mobile Country Code
  - Mobile Network Code
  - Sim Number
  - Subscription Id
5. Network Information: 
  - Is Connected
  - Connection Type
6. WiFi Information: 
  - BSSID
  - SSID
  - IP
  - Signal Strength
  - Speed
  - Frequency

## Build:
```
npm install @capacitor/core @capacitor/cli
npx cap init
npm run build
npx cap add android
npx cap add ios
npx cap copy android
cd android
gradlew assembleDebug   # On Windows
OR
./gradlew assembleDebug  # On macOS / Linux
```
### After this, your APK will be located at:
`android/app/build/outputs/apk/debug/app-debug.apk`

# Disclaimer:
#### This project is for educational purposes only

# Credits:
- To the Tools that inspired me to build this
- ChatGPT – for helping me fix some errors
- Windows Copilot – for generating images for me haha 😄
