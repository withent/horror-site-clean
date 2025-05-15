<template>
  <div class="alt-background">
    <div class="horror-page">
      <!-- モーダル -->
      <div
        v-if="selectedImage"
        class="modal-overlay"
        @click="selectedImage = null"
      >
        <div class="modal-content">
          <img :src="selectedImage" alt="拡大画像" />
        </div>
      </div>
      <h1>👻 ホラ子オリジナル画像集 👻</h1>

      <div class="image-grid">
        <div class="image-card" v-for="(img, index) in images" :key="index">
          <img
            :src="img"
            alt="ホラー画像"
            class="horror-image"
            @click="selectedImage = img"
          />
        </div>
      </div>

      <NuxtLink to="/" class="back-link">⬅ トップに戻る</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedImage = ref(null);
const images = ref([
  "/media/images/001.png",
  "/media/images/002.png",
  "/media/images/003.png",
  "/media/images/004.png",
  "/media/images/005.png",
]);
</script>

<style scoped>
/* 背景を自然に馴染ませてスクロール対応 */
.alt-background {
  background-image: url('/images/horror-upload-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding: 0;
}

.horror-page {
  font-family: "Shippori Mincho B1", sans-serif;
  color: white;
  padding: 40px;
  min-height: 100vh;
  position: relative;
  z-index: 10;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
}

.image-card {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border: 2px solid white;
  width: 200px;
  text-align: center;
}

.horror-image {
  max-width: 100%;
  max-height: 180px;
  height: auto;
  width: auto;
  display: block;
  margin: 0 auto;
  object-fit: contain;
}

.horror-image:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
  box-shadow: 0 0 12px rgba(255, 0, 0, 0.4);
}

.back-link {
  display: inline-block;
  margin-top: 2rem;
  color: #baffc9;
  text-decoration: underline;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: zoom-out;
}

.modal-content img {
  max-width: 90vw;
  max-height: 90vh;
  border: 4px solid white;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
}

.modal-content {
  animation: zoomIn 0.4s ease-out;
}

@keyframes zoomIn {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
