<template>
  <div>
    <!-- Hero Section -->
    <section class="hero min-h-screen flex items-center justify-center text-center" :style="backgroundStyle">
      <div class="text-white space-y-8 px-4">
        <h1 class="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-md">
          Selamat Datang di <span class="text-yellow-400">Ramadhan</span>
        </h1>
        <p class="text-xl italic drop-shadow-md">
          Sambut bulan penuh berkah dengan hati dan jiwa yang bersih
        </p>
        <!-- Countdown displayed here -->
        <div v-if="!isRamadhan" class="countdown bg-yellow-400 text-gray-800 font-bold text-2xl px-8 py-4 rounded-full shadow-lg animate-bounce inline-block">
          {{ countdown }}
        </div>
        <div v-else class="countdown bg-yellow-400 text-gray-800 font-bold text-2xl px-8 py-4 rounded-full shadow-lg inline-block">
          Ramadhan telah tiba!
        </div>
      </div>
    </section>

    <!-- Konten Ramadhan -->
    <section v-if="isRamadhan" class="content bg-gradient-to-b from-gray-100 to-gray-200 py-16">
      <div class="container mx-auto px-6 lg:px-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <!-- Jadwal Shalat -->
          <div class="card">
            <h2 class="card-title">Jadwal Shalat</h2>
            <PrayerSchedule />
          </div>

          <!-- To-Do List Ramadhan -->
          <div class="card">
            <h2 class="card-title">To-Do List Ramadhan</h2>
            <div>
              <input
                v-model="newTask"
                @keyup.enter="addTask"
                class="w-full p-3 mb-4 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                type="text"
                placeholder="Tambahkan tugas..."
              />
              <ul class="list-none space-y-4">
                <li v-for="(task, index) in tasks" :key="index" class="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg shadow-md transition-all hover:shadow-xl">
                  <input
                    type="checkbox"
                    v-model="task.completed"
                    @change="updateTaskCompletion(task, index)"
                    class="w-5 h-5 text-yellow-500"
                  />
                  <span :class="{ 'line-through text-gray-500': task.completed, 'text-gray-800': !task.completed }" class="flex-grow">
                    {{ task.name }}
                  </span>
                  <button @click="deleteTask(index)" class="text-red-500 hover:text-red-700 transition-colors duration-200">
                    Hapus
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Tips Ramadhan -->
          <div class="card">
            <h2 class="card-title">Tips Ramadhan</h2>
            <ul class="list-disc list-inside space-y-2">
              <li>Minum air yang cukup saat sahur dan berbuka.</li>
              <li>Kurangi makanan berminyak untuk menjaga energi.</li>
              <li>Luangkan waktu untuk ibadah dan tadarus Al-Qur'an.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PrayerSchedule from "../components/PrayerSchedule.vue";

export default {
  components: {
    PrayerSchedule,
  },
  data() {
    return {
      countdown: "",
      isRamadhan: false,
      backgroundStyle: {
        backgroundImage: "url('/images/ramadhan-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      newTask: "",
      tasks: [],
    };
  },
  methods: {
    startCountdown() {
      // Ambil tahun sekarang untuk menentukan tanggal Ramadhan
      const currentYear = new Date().getFullYear();
      // Tentukan tanggal awal Ramadhan (misalnya, 10 Maret 2024)
      const ramadhanDate = new Date(`${currentYear}-03-10T00:00:00`);

      // Memulai timer countdown
      const timer = setInterval(() => {
        const now = new Date();
        const timeLeft = ramadhanDate - now;

        if (timeLeft <= 0) {
          clearInterval(timer);
          this.countdown = "Ramadhan telah tiba!";
          this.isRamadhan = true; // Menandakan bahwa Ramadhan telah tiba
        } else {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
          const seconds = Math.floor((timeLeft / 1000) % 60);
          this.countdown = `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
        }
      }, 1000);
    },

    addTask() {
      if (this.newTask.trim() !== "") {
        const task = {
          name: this.newTask.trim(),
          completed: false,
        };
        this.tasks.push(task);
        this.newTask = "";
        this.saveTasks();
      }
    },

    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },

    updateTaskCompletion(task, index) {
      this.tasks[index].completed = task.completed;
      this.saveTasks();
    },

    saveTasks() {
      localStorage.setItem("ramadhanTasks", JSON.stringify(this.tasks));
    },

    loadTasks() {
      const storedTasks = localStorage.getItem("ramadhanTasks");
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }
    },
  },

  mounted() {
    this.startCountdown(); // Mulai countdown pada saat halaman dimuat
    this.loadTasks();
  },
};
</script>

<style scoped>
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/public/images/ramadhan-bg.jpg");
  background-size: cover;
  background-position: center;
  color: #fff;
}

.countdown {
  border-radius: 9999px;
  animation: bounce 2s infinite;
}

.card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1f2937;
}

/* Responsive Grid */
@media (min-width: 768px) {
  .grid-cols-1 {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .grid-cols-1 {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Button hover effect */
button {
  transition: transform 0.2s ease, color 0.2s ease;
}

button:hover {
  transform: scale(1.1);
  color: red;
}
</style>
