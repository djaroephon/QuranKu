<template>
    <div class="surah-card" @click="selectSurah">
      <h2>{{ surahName }}</h2>
      <h3>{{ surahTranslation }}</h3>
      <h4>{{ ayahCount }} Ayat</h4>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      surahName: String,    
      surahTranslation: String, 
      ayahCount: Number,        
      selectSurah: Function,    
    },
  };
  </script>
  
  <style scoped>
  .surah-card {
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .surah-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
  
  .surah-card h2 {
    font-size: 22px;
    color: #16a085;
    margin-bottom: 10px;
  }
  
  .surah-card h3 {
    font-size: 20px;
    color: #7f8c8d;
    margin-bottom: 10px;
  }
  
  .surah-card h4 {
    font-size: 18px;
    color: #34495e;
  }
  </style>
  