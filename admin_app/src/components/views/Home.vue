<style>

</style>

<template>
    <div class="flex flex-col items-center bg-gray-900 p-4 gap-6 min-h-screen">
        <div class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-gray-800 text-white rounded-2xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-green-400 mb-2">Mouse Trap:</h2>
        <p class="text-gray-300">A simple remote access tool created with Vue and Capacitor.</p><br>
        <p class="text-gray-300">- Developer: Terrius Punk</p>
        <p class="text-gray-300">- Version: 1.0</p><br>
        <p class="text-gray-300">- For more information visit my GitHub account.</p><br>
        <p class="text-gray-300"><span class="text-red-400">Note</span>: Still in development</p>
        </div>

        <div class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-gray-800 text-white rounded-2xl shadow-lg p-6">
        <h2 class="text-xl sm:text-2xl font-bold mb-4 text-green-400">
            Features:
        </h2>
        <p class="text-sm sm:text-base text-gray-300 mb-6">
            <pre>
1. Device Info
2. Geolocation
3. Sim Card Info
4. Network Information
5. WiFi Information
6. Open Browser
7. Get/Push Notification
            </pre>
        </p>
        <button class="w-full bg-green-500 hover:bg-green-600 transition text-black font-semibold py-2 rounded-lg"
        @click="goToDashboard">
            Dashboard
        </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goToDashboard = () => {
    router.push('/dashboard')
}
</script>