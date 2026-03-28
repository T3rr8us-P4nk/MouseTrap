<template>
    <div class="flex flex-col items-center bg-gray-900 p-4 gap-6 min-h-screen">
        <div class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-gray-800 text-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl sm:text-2xl font-bold mb-4 text-green-400">
                Devices: 
            </h2>
            <div v-if="!devices">
                <p class="text-red-500">No Device Available</p>
            </div>
            <div v-if="devices">
                <p class="mb-3">Device ID: </p>
                <div v-for="device, id in devices" :key="id" class="mb-2">
                    <button class="w-full bg-green-500 hover:bg-green-600 transition text-black font-semibold py-2 rounded-lg"
                    @click="goToPage(id)">{{ id }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from "vue";
import { db } from "../../../assets/db/firebase";
import { ref as dbRef, onValue } from "firebase/database";

const devices = ref(null);

let unsubscribe;

onMounted(() => {
    const deviceRef = dbRef(db, "Device");

    onValue(deviceRef, (snapshot) => {
        devices.value = snapshot.val();
        console.log("DATA:", devices.value);
    });
});

onUnmounted(() => {
    if (unsubscribe) unsubscribe;
});

const router = useRouter()
const goToPage = (id) => {
    router.push(`/deviceDashboard/${id}`)
}
</script>