<template>
  <div class="video-page">
    <h1>🎬 なおきの動画ルーム</h1>
    <p>YouTube動画と自作動画を紹介します！</p>

    <!-- YouTube埋め込み -->
    <h2>YouTube動画</h2>
    <div
      class="video-wrapper"
      v-for="(videoUrl, index) in youtubeVideos"
      :key="index"
    >
      <iframe
        width="560"
        height="315"
        :src="videoUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <!-- 自作動画アップロード -->
    <h2>🎥 自作動画アップロード</h2>

    <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
      <p>ここに動画ファイル（mp4）をドラッグ＆ドロップ</p>
      <p>または</p>
      <input
        type="file"
        accept="video/mp4"
        @change="uploadVideo"
        class="file-input"
      />
    </div>

    <div v-if="uploadedPaths.length > 0" class="video-grid">
      <h3>🎥 アップロード動画一覧</h3>
      <div
        class="video-card"
        v-for="(path, index) in uploadedPaths"
        :key="index"
      >
        <video :src="path" controls muted></video>
        <div class="video-info">
          <p class="video-title">動画{{ index + 1 }}</p>
          <p class="video-meta">アップロード済み</p>
        </div>
      </div>
    </div>

    <!-- 戻るボタン -->
    <NuxtLink to="/" class="back-link">⬅ トップページに戻る</NuxtLink>
  </div>
</template>

<script setup>
import { ref } from "vue";

const youtubeVideos = [
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
];

// 🔁 配列に変更
const uploadedPaths = ref([]);

async function uploadVideo(event) {
  const file = event.target.files[0];
  if (file) {
    await sendToServer(file);
  }
}

async function handleDrop(e) {
  const file = e.dataTransfer.files[0];
  if (file && file.type === "video/mp4") {
    await sendToServer(file);
  }
}

async function sendToServer(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (data.status === "ok") {
    // ✅ 複数追加できるように push
    uploadedPaths.value.push(data.path);
  } else {
    alert("アップロードに失敗しました");
  }
}
</script>

<style scoped>
.video-page {
  text-align: center;
  padding: 40px;
}

.video-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.upload-area {
  border: 2px dashed #aaa;
  padding: 40px;
  margin: 30px auto;
  width: 60%;
  border-radius: 12px;
  background-color: #f9f9f9;
  cursor: pointer;
}

.upload-area:hover {
  background-color: #f0f0f0;
}

.file-input {
  margin-top: 10px;
}

.preview {
  margin-top: 30px;
}

.back-link {
  margin-top: 40px;
  display: inline-block;
  padding: 10px 20px;
  background: #444;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
}

/* 🔽 YouTube風カードレイアウトを追加 */
.video-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
}

.video-card {
  width: 320px;
  background-color: #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.video-card:hover {
  transform: scale(1.02);
}

.video-card video {
  width: 100%;
  height: auto;
}

.video-info {
  padding: 10px;
  text-align: left;
}

.video-title {
  font-weight: bold;
  margin: 0;
}

.video-meta {
  font-size: 0.8rem;
  color: #777;
}
</style>
