<template>
  <div class="alt-background">
    <!-- 黒のオーバーレイ -->
    <div class="bg-overlay"></div>

    <div class="video-page">
      <h1>🎥 ホラ子動画一覧</h1>

      <!-- 動画一覧 -->
      <div class="video-grid">
        <div
          class="video-card"
          v-for="(video, index) in uploadedVideos"
          :key="index"
        >
          <video :src="video.path" controls muted width="180" height="180" />
          <div class="video-info">
            <p class="video-title">{{ video.title }}</p>
          </div>
        </div>
      </div>

      <NuxtLink to="/" class="back-link">⬅ トップに戻る</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const uploadedVideos = ref([])

onMounted(async () => {
  const res = await fetch('/api/videos')
  uploadedVideos.value = await res.json()
})

async function handleFileSelect(e) {
  const file = e.target.files[0]
  if (file && file.type === 'video/mp4') {
    await uploadToServer(file)
  }
}

async function handleDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file && file.type === 'video/mp4') {
    await uploadToServer(file)
  }
}

async function uploadToServer(file) {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()
  if (data.status === 'ok') {
    const title = data.path.split('/').pop().replace('.mp4', '')
    uploadedVideos.value.unshift({
      path: data.path,
      title,
    })
  } else {
    alert('アップロードに失敗しました')
  }
}
</script>

<style scoped>
/* 背景部分 */
.alt-background {
  position: relative;
  background-color: black;
  background-image: url('/images/horror-upload-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding: 0;
  overflow: hidden;
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0); /* ← ここで黒くする */
  z-index: 1;
}

/* 中身のレイヤーを画像＋オーバーレイの上に置く */
.horror-page,
.video-page {
  position: relative;
  z-index: 2;
  padding: 2rem;
  color: white;
  font-family: 'Shippori Mincho B1', serif;
}


/* オーバーレイ＆中身 */
.video-page {
  font-family: 'Shippori Mincho B1', serif;
  color: white;
  padding: 2rem;
  text-align: center;
  z-index: 10;
  position: relative;
  background-color: rgba(0, 0, 0, 0.6); /* 読みやすさのための半透明 */
  min-height: 100vh;
}

.video-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
}

.video-card {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border: 2px solid white;
  width: 200px;
  text-align: center;
}

.video-title {
  margin-top: 0.5rem;
  font-size: 1rem;
}

.back-link {
  display: inline-block;
  margin-top: 2rem;
  color: #baffc9;
  text-decoration: underline;
}

</style>
