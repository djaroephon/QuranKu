<template>
  <div class="container p-6 bg-gray-100 max-w-4xl mx-auto">
    <button
      class="back-button bg-green-500 text-white py-2 px-6 rounded-full text-lg font-semibold uppercase hover:bg-green-600 transition-colors"
      @click="$router.push('/')"
    >
      Kembali
    </button>

    <div v-if="isLoading" class="text-xl font-bold text-center text-gray-700 mt-8">
      Loading...
    </div>

    <div v-else class="text-center mt-12">
      <h2 class="surah-title text-4xl font-extrabold text-gray-800 mb-4 capitalize tracking-wide">
        {{ surahDetails.namaLatin }} ({{ surahDetails.nama }})
      </h2>
      <p class="surah-meaning text-lg text-gray-600 mb-8 italic">
        {{ surahDetails.arti }}
      </p>

      <div
        v-if="surahDetails.ayat && surahDetails.ayat.length > 0"
        class="ayahs-container grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6"
      >
        <div
          v-for="ayah in surahDetails.ayat"
          :key="ayah.nomorAyat"
          ref="ayahCards"
          :class="['ayah-item', { 'active-ayah': audioState.currentAyah === ayah.nomorAyat }]"
        >
          <p class="ayah-number text-xl font-semibold text-gray-700 mb-4">
            Ayat {{ ayah.nomorAyat }}
          </p>
          <div class="ayah-text text-lg text-gray-800">
            <span class="arabic-text block text-2xl text-teal-600 font-serif mb-2 text-right">
              {{ ayah.teksArab }}
            </span>
            <span class="latin-text block text-md text-blue-600 mb-2 text-right">
              {{ ayah.teksLatin }}
            </span>
            <span class="indonesia-text block text-md text-gray-600">
              Artinya: {{ ayah.teksIndonesia }}
            </span>
          </div>
          <div class="audio-controls mt-4">
            <audio
              :ref="'audio' + ayah.nomorAyat"
              :src="getAudioUrl(ayah.nomorAyat)"
              @ended="playNextAyah(ayah.nomorAyat)"
            ></audio>
            <button
              class="play-pause bg-teal-500 text-white py-1 px-4 rounded-full hover:bg-teal-600 transition-colors float-left"
              @click="togglePlayPause(ayah.nomorAyat)"
            >
              {{ audioState.currentAyah === ayah.nomorAyat ? 'Pause' : 'Play' }}
            </button>
          </div>
        </div>
      </div>

      <div v-else>
        <p class="no-ayat text-lg font-bold text-red-600 mt-8">
          No ayat found for this surah.
        </p>
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
      audioState: {
        currentAyah: null, 
      },
    };
  },
  methods: {
    async fetchSurahDetails() {
      try {
        const id = this.$route.params.id;
        if (!id) throw new Error("ID surah tidak valid.");
        const response = await axios.get(`https://equran.id/api/v2/surat/${id}`);
        this.surahDetails = response.data.data || {};
      } catch (error) {
        console.error(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    getAudioUrl(ayahNumber) {
      const surah = String(this.surahDetails.nomor).padStart(3, "0");
      const ayah = String(ayahNumber).padStart(3, "0");
      return `https://equran.nos.wjv-1.neo.id/audio-partial/Misyari-Rasyid-Al-Afasi/${surah}${ayah}.mp3`;
    },
    togglePlayPause(ayahNumber) {
      const currentAudio = this.$refs[`audio${ayahNumber}`][0];
      if (this.audioState.currentAyah === ayahNumber) {
        currentAudio.pause();
        this.audioState.currentAyah = null;
      } else {
        if (this.audioState.currentAyah !== null) {
          const previousAudio = this.$refs[`audio${this.audioState.currentAyah}`][0];
          previousAudio.pause();
        }
        currentAudio.play();
        this.audioState.currentAyah = ayahNumber;
        this.scrollToActiveAyah(ayahNumber); 
      }
    },
    scrollToActiveAyah(ayahNumber) {
      this.$nextTick(() => {
        const activeCard = this.$refs.ayahCards.find((element, index) => {
          return this.surahDetails.ayat[index].nomorAyat === ayahNumber;
        });
        if (activeCard) {
          
          activeCard.scrollIntoView({
            behavior: "smooth", 
            block: "center", 
          });
        }
      });
    },
    playNextAyah(currentAyah) {
      const nextAyah = this.surahDetails.ayat.find(
        (ayah) => ayah.nomorAyat === currentAyah + 1
      );
      if (nextAyah) {
        this.$refs[`audio${nextAyah.nomorAyat}`][0].play();
        this.audioState.currentAyah = nextAyah.nomorAyat;
        this.scrollToActiveAyah(nextAyah.nomorAyat); 
      } else {
        this.audioState.currentAyah = null;
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

.ayah-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.ayah-item.active-ayah {
  transform: scale(1.1); 
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  background-color: #f0fff4;
}

.audio-controls button {
  background-color: #38b2ac; 
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  transition: background-color 0.3s ease;
}

.audio-controls button:hover {
  background-color: #2c7a7b; 
}
</style>
