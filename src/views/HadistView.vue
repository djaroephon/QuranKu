<script>
import axios from "axios";

export default {
  name: "HadithApp",
  data() {
    return {
      hadiths: [],
      isLoading: true,
      error: null,
      selectedHadith: null, 
      isModalOpen: false, 
    };
  },
  methods: {
    async fetchHadiths() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(
          "https://hadis-api-id.vercel.app/hadith/bukhari?page=1&limit=20"
        );

        if (response.data && response.data.items) {
          this.hadiths = response.data.items.map((hadith) => ({
            ...hadith,
            title: this.generateTitle(hadith.id),
          }));
        } else {
          this.error = "Tidak ada data hadits.";
        }
      } catch (err) {
        this.error = "Terjadi kesalahan saat memuat data.";
      } finally {
        this.isLoading = false;
      }
    },
    generateTitle(hadithText) {
      if (hadithText.includes("puasa")) return "Hadits Tentang Puasa";
      if (hadithText.includes("sholat")) return "Hadits Tentang Sholat";
      if (hadithText.includes("zakat")) return "Hadits Tentang Zakat";
      if (hadithText.includes("iman")) return "Hadits Tentang Iman";
      if (hadithText.includes("doa")) return "Hadits Tentang Doa";
      return "Hadits Umum";
    },
    showHadithDetail(hadith) {
      this.selectedHadith = hadith; 
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false; 
      setTimeout(() => {
        this.selectedHadith = null; 
      }, 300);
    },
  },
  mounted() {
    this.fetchHadiths(); 
  },
};
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8 text-center text-teal-600">Kumpulan Hadits Bukhari</h1>

    <div v-if="isLoading" class="text-center text-lg text-gray-600">Memuat data...</div>

    <div v-if="error" class="text-red-500 text-center text-lg">{{ error }}</div>

    <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="hadith in hadiths"
        :key="hadith.number"
        class="p-4 bg-white shadow-md rounded-lg border hover:shadow-lg transition"
        @click="showHadithDetail(hadith)"
      >
        <h3 class="text-lg font-bold text-teal-700">
          {{ hadith.title }}
        </h3>
        <p class="text-sm text-gray-600 mt-2">Hadits No: {{ hadith.number }}</p>
      </div>
    </div>

    <div
      v-if="selectedHadith"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full transform transition-transform duration-300 scale-100"
        :class="{ 'animate-slide-in': isModalOpen, 'animate-slide-out': !isModalOpen }"
      >
        <h2 class="text-xl font-bold mb-4 text-teal-700">
          {{ selectedHadith.title }}
        </h2>

        <div class="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-200">
          <p class="text-right text-xl font-semibold text-gray-800">
            {{ selectedHadith.arab }}
          </p>
          <h5 class="text-gray-700 mt-4">Artinya: </h5>
          <p class="text-gray-700 mt-4">{{ selectedHadith.id }}</p>
        </div>

        <div class="text-right mt-6">
          <button
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            @click="closeModal"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideIn {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0;
  }
}

.animate-slide-in {
  animation: slideIn 0.3s forwards;
}

.animate-slide-out {
  animation: slideOut 0.3s forwards;
}

.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-teal-500 {
  scrollbar-color: #38b2ac #e2e8f0;
}

.scrollbar-track-gray-200 {
  background-color: #edf2f7;
}

@media (max-width: 640px) {
  .container {
    padding: 4px;
  }
}
</style>