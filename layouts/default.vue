<template>
  <div class="top-container" @mousemove="updateLightPosition">
    <!-- 背景画像（特定ページでは非表示） -->
    <img
      v-if="!isAltBackgroundPage"
      src="/images/Top.jpg"
      alt="Top Image"
      class="top-image"
    />

    <!-- ページの中身 -->
    <div class="content-layer">
      <slot />
    </div>

    <!-- 蛍光灯フラッシュ -->
    <div class="flicker"></div>

    <!-- 懐中電灯マスク -->
    <div class="flashlight-mask" :style="maskStyle"></div>

    <!-- ホラーBGM -->
    <audio ref="bgm" :src="bgmPath" type="audio/mpeg" autoplay loop></audio>

    <!-- 🔇 ミュート切り替えボタン -->
    <button
      @click="toggleMute"
      style="
        position: fixed;
        bottom: 90px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 8px 14px;
        border: 1px solid white;
        border-radius: 8px;
        z-index: 9999;
      "
    >
      {{ isMuted ? "🔇" : "🔊" }}
    </button>

    <!-- スクロールボタン（トップ以外で表示） -->
    <div v-if="!isTopPage" class="scroll-buttons">
      <button class="scroll-btn" @click="scrollToTop">▲</button>
      <button class="scroll-btn" @click="scrollToBottom">▼</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const mouseX = ref(0);
const mouseY = ref(0);

const route = useRoute();

const isAltBackgroundPage = computed(() =>
  ["/horror-upload", "/upload"].includes(route.path)
);
const isTopPage = computed(() => route.path === "/");

const updateLightPosition = (event) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
};

const maskStyle = computed(() => ({
  WebkitMaskImage: `radial-gradient(circle 160px at ${mouseX.value}px ${mouseY.value}px, transparent 0%, black 100%)`,
  maskImage: `radial-gradient(circle 160px at ${mouseX.value}px ${mouseY.value}px, transparent 0%, black 100%)`,
}));

const bgmPath = "/audio/horror-bgm.MP3";
const bgm = ref(null);
const isMuted = ref(false);

const toggleMute = () => {
  isMuted.value = !isMuted.value;
  if (bgm.value) {
    bgm.value.muted = isMuted.value;
  }
};

onMounted(() => {
  if (bgm.value) {
    bgm.value.muted = isMuted.value;
  }
  bgm.value?.play().catch(() => {
    const handler = () => {
      bgm.value?.play();
      window.removeEventListener("click", handler);
    };
    window.addEventListener("click", handler);
  });
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1&display=swap");

html,
body {
  background-color: black;
  color: white;
  font-family: "Shippori Mincho B1", serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.top-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.top-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.content-layer {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  padding: 2rem;
}

.flashlight-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 150vw;
  height: 150vh;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 100;
  transition: background-color 0.3s ease;
}

.flicker {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  opacity: 0;
  z-index: 99;
  pointer-events: none;
  animation: flickerAnim 10s infinite;
  mix-blend-mode: overlay;
}

@keyframes flickerAnim {
  0%,
  5%,
  10%,
  14%,
  18%,
  22%,
  100% {
    opacity: 0;
  }
  2% {
    opacity: 0.1;
  }
  6% {
    opacity: 0.15;
  }
  11% {
    opacity: 0.8;
  }
  15% {
    opacity: 0.05;
  }
  19% {
    opacity: 0.2;
  }
  23% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.4;
  }
  51% {
    opacity: 0;
  }
  70%,
  72%,
  74% {
    opacity: 1;
  }
  75%,
  76% {
    opacity: 0.5;
  }
  77%,
  78%,
  79% {
    opacity: 0;
  }
  90% {
    opacity: 0.3;
  }
  93% {
    opacity: 1;
  }
  96% {
    opacity: 0.4;
  }
}

.scroll-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 500;
}

.scroll-btn {
  background: rgba(255, 0, 0, 0);
  color: white;
  border: 1px solid white;
  padding: 8px 12px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 6px;
  font-family: "Shippori Mincho B1", serif;
  transition: transform 0.2s ease;
}

.scroll-btn:hover {
  transform: scale(1.1);
}

.mute-btn {
  position: fixed;
  bottom: 90px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 14px;
  border-radius: 10px;
  z-index: 9999; /* ← ここを上げる */
  font-family: "Shippori Mincho B1", serif;
  font-size: 14px;
  border: 1px solid white;
  cursor: pointer;
}
@media (max-width: 768px) {
  .content-layer {
    padding: 1rem;
  }

  .scroll-buttons {
    bottom: 10px;
    right: 10px;
    gap: 5px;
  }

  .scroll-btn {
    font-size: 14px;
    padding: 6px 10px;
  }

  button.fixed {
    bottom: 10px;
    right: 10px;
    font-size: 14px;
    padding: 6px 10px;
  }

  .flashlight-mask {
    width: 200vw;
    height: 200vh;
  }
}
</style>
