<template>
  <div class="home">
    <h1>Kissyのホラーコンテンツの遊び場</h1>
    <p>動画や配信ページはこちらから👇</p>

    <div class="link-list">
      <NuxtLink to="/youtube" class="home-link">▶ 登録チャンネル一覧</NuxtLink>
      <NuxtLink to="/upload" class="home-link">▶ ホラ子動画一覧</NuxtLink>
      <NuxtLink to="/horror-upload" class="home-link"
        >👻 画像登録ページへ</NuxtLink
      >
      <NuxtLink to="/shop" class="home-link"
        >🛍 ホラ子のTシャツ販売ページへ</NuxtLink
      >
      <NuxtLink to="/stories" class="home-link"
        >👻 怖い体験談スレッドへ</NuxtLink
      >
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* 全体背景とフォント設定 */
.home {
  font-family: 'Zen Kurenaido', sans-serif;
  background-image: url('/images/Top.jpg'); /* ✅ ここで背景指定 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* 📌 固定スクロール */
  color: white;
  padding: 40px;
  text-align: center;
  min-height: 100vh; /* フル画面の高さを確保 */
}

/* タイトルのアニメーションと影 */
h1 {
  font-size: 2rem;
  color: #ff0033;
  text-shadow: 2px 2px 4px black;
  animation: pulse 2s infinite;
}

/* タイトルがドクドク脈打つ */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

/* 概要文の色も少しダークに */
p {
  color: #ddd;
  font-size: 1.1rem;
}

/* リンクリスト */
.link-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin-top: 30px;
}

/* ホラーっぽいボタン */
.home-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #220022;
  color: #ffdddd;
  text-decoration: none;
  border: 2px solid #aa00aa;
  border-radius: 8px;
  font-size: 18px;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px #aa00aa88;
}

/* ホバーで光って拡大 */
.home-link:hover {
  background-color: #440044;
  color: #fff;
  transform: scale(1.05);
}
</style>
