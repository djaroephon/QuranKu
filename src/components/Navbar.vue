<template>
  <nav class="bg-teal-600 p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo (Hidden on mobile) -->
      <img src="/public/images/logo.png" alt="Logo" class="h-12 w-auto lg:block hidden" />

      <!-- Mobile Hamburger Icon (Visible on mobile) -->
      <div class="lg:hidden flex items-center">
        <button @click="toggleMenu" class="text-white">
          <i class="fas fa-bars fa-2x"></i>
        </button>
      </div>

      <!-- Navigation Links (Desktop) -->
      <div class="hidden lg:flex space-x-6 text-white text-lg">
        <router-link to="/" class="hover:text-teal-200">Home</router-link>
        <router-link to="/sholat" class="hover:text-teal-200">Sholat</router-link>
        <router-link to="/hadist" class="hover:text-teal-200">Hadist</router-link>
        <!-- <router-link to="/ramadhan" class="hover:text-teal-200">Ramadhan</router-link> -->
        <router-link to="/doa" class="hover:text-teal-200">Doa</router-link>
      </div>

      <!-- Social Media Icons -->
      <div class="flex space-x-4">
        <a href="https://instagram.com/djaroephon.1746" target="_blank" class="text-white hover:text-teal-200">
          <i class="fab fa-instagram fa-2x"></i>
        </a>
        <a href="https://github.com/djaroephon" target="_blank" class="text-white hover:text-teal-200">
          <i class="fab fa-github fa-2x"></i>
        </a>
      </div>
    </div>

    <!-- Mobile Navigation Links (Hidden by default) -->
    <div v-show="menuOpen" class="lg:hidden bg-teal-600 text-white text-lg py-2 px-4">
      <router-link to="/" class="block py-2 hover:text-teal-200">Home</router-link>
      <router-link to="/sholat" class="block py-2 hover:text-teal-200">Sholat</router-link>
      <router-link to="/hadist" class="block py-2 hover:text-teal-200">Hadist</router-link>
      <!-- <router-link to="/ramadhan" class="block py-2 hover:text-teal-200">Ramadhan</router-link> -->
      <router-link to="/doa" class="block py-2 hover:text-teal-200">Doa</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      menuOpen: false, // This controls the visibility of the mobile menu
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen; // Toggles the menu visibility on mobile
    },
  },
};
</script>

<style scoped>
/* Optional Styling */
</style>
