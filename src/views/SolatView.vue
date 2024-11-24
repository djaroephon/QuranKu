<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const timings = ref(null); 
const isLoading = ref(true);
const error = ref(null);

const fetchPrayerTimes = async () => {
  try {
    const response = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
      params: {
        city: 'Banda Aceh',  
        country: 'Indonesia',  
        method: 2, 
      },
    });

    
    if (response.data.code === 200) {
      const allTimings = response.data.data.timings;

     
      const filteredTimings = {
        Subuh: allTimings.Fajr,
        Dzuhur: allTimings.Dhuhr,
        Asar: allTimings.Asr,
        Maghrib: allTimings.Maghrib,
        Isha: allTimings.Isha,
        Sunrise: allTimings.Sunrise,
        Sunset: allTimings.Sunset

      };

      timings.value = filteredTimings;
    } else {
      error.value = "Tidak dapat memuat data jadwal salat.";
    }
  } catch (err) {
    error.value = "Terjadi kesalahan saat memuat data.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPrayerTimes();
});
</script>

<template>
  <div class="solat-view p-6 bg-gray-100 max-w-4xl mx-auto">
    <h2 class="text-3xl font-semibold text-teal-600 mb-6 text-center">
      Jadwal Salat Wajib (Banda Aceh)
    </h2>

    <div v-if="isLoading" class="text-xl font-semibold text-gray-700 text-center">
      Memuat data...
    </div>

    <div v-if="error" class="text-xl font-semibold text-red-600 text-center">
      {{ error }}
    </div>

    <div v-if="timings" class="salat-times grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="(time, name) in timings" :key="name" class="salat-time bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
        <h3 class="text-xl font-semibold text-teal-600 mb-2 capitalize">{{ name }}</h3>
        <p class="text-lg text-gray-700">{{ time }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.salat-time {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.salat-time:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
