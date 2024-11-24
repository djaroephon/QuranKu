<script>
import axios from "axios";
import SurahCard from "../components/SurahCard.vue";

export default {
  components: {
    SurahCard,
  },
  data() {
    return {
      surahList: [],
      filteredSurah: [],
      isLoading: true,
      error: null,
      searchQuery: "",
    };
  },
  methods: {
    async fetchSurahList() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get("https://equran.id/api/v2/surat");
        if (response.data && response.data.data) {
          this.surahList = response.data.data;
          this.filteredSurah = this.surahList;
        } else {
          throw new Error("Data surah tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error fetching surah list:", error.message);
        this.error = "Gagal memuat daftar surah. Silakan coba lagi.";
      } finally {
        this.isLoading = false;
      }
    },
    goToSurahDetails(id) {
      this.$router.push(`/surah/${id}`);
    },
    searchSurah() {
      if (this.searchQuery.trim() === "") {
        this.filteredSurah = this.surahList;
      } else {
        this.filteredSurah = this.surahList.filter(surah =>
          surah.namaLatin.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          surah.arti.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
  },
  mounted() {
    this.fetchSurahList();
  },
};
</script>


<template>
  <div>
    <div
      class="hero relative h-screen flex items-center justify-center bg-cover bg-center"
      style="background-image: url('/public/images/bg.jpg');"
    >
      <div class="hero-overlay absolute inset-0 bg-black opacity-50"></div>
      <div class="hero-content z-10 text-center text-white p-4 space-y-4" data-aos="fade-up" data-aos-duration="1000">
        <h1 class="text-5xl font-bold">Al-Qur'an Juz 1-30</h1>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Cari Surah..." 
          @input="searchSurah"
          class="search-input px-6 py-3 text-lg rounded-full w-full max-w-md mx-auto bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          data-aos="fade-up" data-aos-delay="200"
        />
      </div>
    </div>

    <div class="container mx-auto p-4">
      <section class="mt-8">
        <p v-if="isLoading" class="text-center text-xl">Loading...</p>
        <p v-else-if="error" class="text-center text-xl text-red-600">{{ error }}</p>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="surah in filteredSurah"
            :key="surah.nomor"
            class="surah-card p-4 bg-white shadow-md rounded-lg text-center cursor-pointer transition-transform hover:scale-105"
            @click="goToSurahDetails(surah.nomor)"
            data-aos="fade-up" data-aos-duration="1000"
          >
            <div class="flex justify-center items-center mb-3">
              <svg
                width="50"
                height="50"
                viewBox="0 0 34 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17 0L19.9723 1.71979C25.3987 2.59915 30.0334 5.84672 32.7866 10.3704H31.026C32.9021 13.1098 34 16.4264 34 20C34 23.5736 32.9021 26.8902 31.026 29.6296H32.7866C30.0334 34.1533 25.3987 37.4009 19.9723 38.2802L17 40L14.0277 38.2802C8.60133 37.4009 3.96661 34.1533 1.21336 29.6296H2.97404C1.09787 26.8902 0 23.5736 0 20C0 16.4264 1.09787 13.1098 2.97404 10.3704H1.21336C3.96661 5.84672 8.60133 2.59915 14.0277 1.71979L17 0ZM17 1.48148L15.0797 2.59259V4.81481L17 5.92593L18.9203 4.81481V2.59259L17 1.48148Z"
                  fill="#846D35"
                />
              </svg>
              <span class="absolute text-sm font-bold text-white">
                {{ surah.nomor }}
              </span>
            </div>

            <h3 class="text-lg font-semibold text-teal-600">
              {{ surah.namaLatin }}
            </h3>
            <p class="text-sm text-gray-500 italic">
              {{ surah.arti }}
            </p>
            <p class="text-xs text-gray-400 mt-2">
              Jumlah Ayat: {{ surah.jumlahAyat }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>





<style scoped>
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.search-input {
  border: 2px solid #00796b;
  border-radius: 50px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.search-input:focus {
  border-color: #004d40;
  background-color: #e0f2f1;
}

.surah-card {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.surah-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.surah-card h3 {
  font-size: 1.125rem; 
  font-weight: 600;
  color: #00796b;
}

.surah-card p {
  margin-top: 0.25rem;
}

.surah-card p.text-sm {
  font-size: 0.875rem;
  color: #5f6368;
}

.surah-card p.text-xs {
  font-size: 0.75rem;
  color: #9e9e9e;
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
}
</style>


