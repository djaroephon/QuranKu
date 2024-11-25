<template>
  <div class="container p-6 bg-gray-100 max-w-4xl mx-auto">
    <button class="back-button bg-green-500 text-white py-2 px-6 rounded-full text-lg font-semibold uppercase hover:bg-green-600 transition-colors" @click="$router.push('/')">
      Kembali
    </button>

    <div v-if="isLoading" class="text-xl font-bold text-center text-gray-700 mt-8">Loading...</div>

    <div v-else class="text-center mt-12">
      <h2 class="surah-title text-4xl font-extrabold text-gray-800 mb-4 capitalize tracking-wide">
        {{ surahDetails.namaLatin }} ({{ surahDetails.nama }})
      </h2>
      <p class="surah-meaning text-lg text-gray-600 mb-8 italic">
        {{ surahDetails.arti }}
      </p>

      <div v-if="surahDetails.ayat && surahDetails.ayat.length > 0" class="ayahs-container grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <div v-for="ayah in surahDetails.ayat" :key="ayah.nomorAyat" class="ayah-item bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
          <p class="ayah-number text-xl font-semibold text-gray-700 mb-4">Ayat {{ ayah.nomorAyat }}:</p>
          <div class="ayah-text text-lg text-gray-800">
            <span class="arabic-text block text-2xl text-teal-600 font-serif mb-2">{{ ayah.teksArab }}</span>
            <span class="latin-text block text-md text-blue-600 mb-2">{{ ayah.teksLatin }}</span>
            <span class="indonesia-text block text-md text-gray-600">Artinya: </span>
            <span class="indonesia-text block text-md text-gray-600">{{ ayah.teksIndonesia }}</span>
          </div>
        </div>
      </div>

      <div v-else>
        <p class="no-ayat text-lg font-bold text-red-600 mt-8">No ayat found for this surah.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      surahDetails: null,
      isLoading: true,
      error: null,
    };
  },
  methods: {
    async fetchSurahDetails() {
      const id = this.$route.params.id;

      if (!id) {
        this.error = "ID surah tidak valid.";
        this.isLoading = false;
        return;
      }

      try {
        const response = await axios.get(`https://equran.id/api/v2/surat/${id}`);

        if (response.data && response.data.data) {
          this.surahDetails = response.data.data;

          // Special handling for Surah Al-Baqarah (ID 2)
          if (this.surahDetails.nomor === 2) {
            this.surahDetails.arti = "Sapi Betina"; // Fix the meaning manually if it's Al-Baqarah
          }

          // If 'ayat' is not available, initialize as an empty array
          if (!this.surahDetails.ayat) {
            this.surahDetails.ayat = [];
          }

          this.error = null; // Reset error if data is fetched successfully
        } else {
          this.error = "Data surah tidak ditemukan.";
        }

        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching surah details:", error);
        this.error = "Terjadi kesalahan saat memuat detail surah.";
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchSurahDetails();
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
}

.back-button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
}

.back-button:hover {
  background-color: #45a049;
}

.loading-text {
  font-size: 20px;
  color: #333;
  text-align: center;
  font-weight: bold;
}

.surah-details {
  text-align: center;
  margin-top: 30px;
}

.surah-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.surah-meaning {
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.6;
  font-style: italic;
}

.ayahs-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  justify-content: center;
}

.ayah-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ayah-number {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.ayah-text {
  text-align: left;
  font-size: 18px;
  line-height: 1.6;
}

.arabic-text {
  display: block;
  font-size: 24px;
  margin: 5px 0;
  color: #00796b;
  font-family: 'Amiri', serif;
}

.latin-text {
  display: block;
  font-size: 16px;
  margin: 5px 0;
  color: #607d8b;
}

.indonesia-text {
  display: block;
  font-size: 16px;
  margin: 5px 0;
  color: #6b6b6b;
}

.no-ayat {
  font-size: 18px;
  color: #ff5722;
  font-weight: bold;
}
</style>
