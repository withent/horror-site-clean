<template>
  <!-- トップページ以外のときだけ表示 -->
  <div v-if="isNotTopPage" class="scroll-button-group">
    <button class="scroll-button" @click="scrollToTop" title="上へ">↑</button>
    <button class="scroll-button" @click="scrollToBottom" title="下へ">↓</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isNotTopPage = computed(() => route.path !== '/')

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.scroll-button-group {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
}

.scroll-button {
  background: #220022;
  color: #ffdddd;
  border: 2px solid #aa00aa;
  border-radius: 50%;
  font-size: 24px;
  padding: 8px 13px;
  cursor: pointer;
  box-shadow: 0 0 12px #aa00aa88;
  transition: all 0.3s ease;
  font-family: 'Zen Kurenaido', sans-serif;
}

.scroll-button:hover {
  background: #440044;
  color: white;
  box-shadow: 0 0 20px #ff00ffcc;
  transform: scale(1.1);
}
</style>
