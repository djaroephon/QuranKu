<template>
    <footer class="bg-teal-600 text-white py-6 mt-12">
      <div class="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-4 md:px-8">
        <!-- Copyright -->
        <p class="text-sm text-center md:text-left font-semibold text-lg hover:text-teal-200 transition-all duration-300">
          &copy; 2024 Djaroephon | Universitas Ubudiyah Indonesia
        </p>
  
        <!-- Social Media Links -->
        <div class="flex space-x-6 mt-4 md:mt-0 justify-center md:justify-start">
          <a 
            href="https://instagram.com/djaroephon.1746" 
            target="_blank" 
            class="text-white hover:text-teal-200 transform hover:scale-125 transition-all duration-300 ease-in-out"
            :aria-label="'Instagram'">
            <i class="fab fa-instagram fa-2x"></i>
          </a>
          <a 
            href="https://github.com/djaroephon" 
            target="_blank" 
            class="text-white hover:text-teal-200 transform hover:scale-125 transition-all duration-300 ease-in-out"
            :aria-label="'GitHub'">
            <i class="fab fa-github fa-2x"></i>
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  /* Optional custom styling */
  footer {
    background-color: #00796b; /* Matching the color of the navigation */
  }
  
  /* Add padding to prevent text from touching the edge */
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  /* Animation for social media icons */
  a:hover {
    color: #ff4081; /* Lighter pink on hover */
  }
  

  </style>
  