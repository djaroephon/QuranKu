<template>
    <div class="prayer-schedule p-4 bg-white text-gray-700 rounded-lg shadow-lg max-w-md mx-auto">
      <div v-if="isLoading" class="text-center">Loading...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <ul v-else>
        <!-- Filter out Firstthird and Lastthird from the prayer list -->
        <li v-for="(time, prayer) in filteredPrayerTimes" :key="prayer" class="flex justify-between py-2">
          <span class="capitalize">{{ prayer }}</span>
          <span>{{ time }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        prayerTimes: {},
        isLoading: true,
        error: null,
      };
    },
    computed: {
      // Computed property to filter out 'Firstthird' and 'Lastthird'
      filteredPrayerTimes() {
        const filteredTimes = { ...this.prayerTimes }; // Clone the prayerTimes object
        delete filteredTimes.Firstthird; // Remove 'Firstthird'
        delete filteredTimes.Lastthird; // Remove 'Lastthird'
        return filteredTimes;
      },
    },
    methods: {
      async fetchPrayerTimes() {
        this.isLoading = true;
        this.error = null;
        try {
          const response = await axios.get("https://api.aladhan.com/v1/timingsByCity", {
            params: {
              city: "Jakarta",
              country: "Indonesia",
              method: 2,
            },
          });
          this.prayerTimes = response.data.data.timings;
        } catch (error) {
          this.error = "Gagal memuat jadwal shalat.";
        } finally {
          this.isLoading = false;
        }
      },
    },
    mounted() {
      this.fetchPrayerTimes();
    },
  };
  </script>
  
  <style scoped>
  .prayer-schedule {
    background-color: #f9f9f9;
  }
  
  li {
    border-bottom: 1px solid #e0e0e0;
  }
  
  span {
    font-size: 1.1rem;
  }
  
  .capitalize {
    text-transform: capitalize;
  }
  </style>
  