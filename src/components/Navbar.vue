<template>
  <nav
    class="bg-teal-600 p-4 shadow-md"
    data-aos="fade-down"
    data-aos-duration="1000"
  >
    <div class="container mx-auto flex justify-between items-center">
      <img

        src="/public/images/logo.png"
        alt="Logo"
        class="h-12 w-auto lg:block hidden"
        data-aos="fade-right"
        data-aos-duration="1000"
      />

      <div
        class="lg:hidden flex items-center"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <button @click="toggleMenu" class="text-white focus:outline-none">
          <i :class="menuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>

      <div
        class="hidden lg:flex space-x-6 text-white text-lg"
        data-aos="fade-down"
        data-aos-duration="1200"
      >
        <router-link to="/" class="hover:text-teal-200">Home</router-link>
        <router-link to="/sholat" class="hover:text-teal-200">Sholat</router-link>
        <router-link to="/hadist" class="hover:text-teal-200">Hadist</router-link>
        <router-link to="/doa" class="hover:text-teal-200">Doa</router-link>
      </div>

      <div
        class="flex space-x-4"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <a
          href="https://instagram.com/djaroephon.1746"
          target="_blank"
          class="text-white hover:text-teal-200"
        >
          <i class="fab fa-instagram fa-2x"></i>
        </a>
        <a
          href="https://github.com/djaroephon"
          target="_blank"
          class="text-white hover:text-teal-200"
        >
          <i class="fab fa-github fa-2x"></i>
        </a>
      </div>
    </div>

    <transition name="slide-fade">
      <div
        v-if="menuOpen"
        class="lg:hidden bg-teal-600 text-white text-lg py-6 px-8 space-y-4 shadow-lg rounded-lg"
      >
        <router-link to="/" class="block py-2 hover:text-teal-200 transition ease-in-out duration-300">
          Home
        </router-link>
        <router-link to="/sholat" class="block py-2 hover:text-teal-200 transition ease-in-out duration-300">
          Sholat
        </router-link>
        <router-link to="/hadist" class="block py-2 hover:text-teal-200 transition ease-in-out duration-300">
          Hadist
        </router-link>
        <router-link to="/doa" class="block py-2 hover:text-teal-200 transition ease-in-out duration-300">
          Doa
        </router-link>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      menuOpen: false, 
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen; 
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

nav {
  position: sticky;
  top: 0;
  z-index: 50;
}


.mobile-menu {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
