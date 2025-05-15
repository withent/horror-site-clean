<template>
  <div class="channel-page">
    <h1>🎮 マイチャンネル一覧 🎮</h1>

    <div class="channel-grid">
      <a
        v-for="channel in channels"
        :key="channel.name"
        :href="channel.url"
        target="_blank"
        rel="noopener"
        class="channel-button"
      >
        {{ channel.name }}（{{ channel.platform }}）
      </a>
    </div>

    <h2>⭐ おすすめチャンネル ⭐</h2>
    <div class="channel-grid">
      <a
        v-for="channel in recommendedChannels"
        :key="channel.name"
        :href="channel.url"
        target="_blank"
        rel="noopener"
        class="channel-button secondary"
      >
        {{ channel.name }}（{{ channel.platform }}）
      </a>
    </div>

    <NuxtLink to="/" class="back-link">⬅ トップに戻る</NuxtLink>
  </div>
</template>

<script setup>
const channels = [
  {
    name: "オカルトーくYouTube",
    platform: "YouTube",
    url: "https://www.youtube.com/@occult-game-8888",
  },
  {
    name: "ゲーム実況",
    platform: "Twitch",
    url: "https://www.twitch.tv/okarutalk",
  },
]

const recommendedChannels = [
  {
    name: "好井まさおの怪談を浴びる会",
    platform: "YouTube",
    url: "https://www.youtube.com/@yoshii-abirukai",
  },
  {
    name: "島田秀平のお怪談巡り",
    platform: "YouTube",
    url: "https://www.youtube.com/@shimadaokaidan",
  },
  {
    name: "タケトのゾゾッとTOWN",
    platform: "YouTube",
    url: "https://www.youtube.com/@taketo_talk",
  },
  {
    name: "デニスの怖いYouTube",
    platform: "YouTube",
    url: "https://www.youtube.com/@denikowa",
  },
  {
    name: "西田どらやきの怪研部",
    platform: "YouTube",
    url: "https://www.youtube.com/@kkbdora",
  },
  {
    name: "たっくーTVれいでぃお",
    platform: "YouTube",
    url: "https://www.youtube.com/@takkutv",
  },
  {
    name: "都市ボーイズ",
    platform: "YouTube",
    url: "https://www.youtube.com/@user-toshiboys",
  },
  {
    name: "トクモリザウルス",
    platform: "YouTube",
    url: "https://www.youtube.com/@tokumorizaurusu",
  },
]
</script>

<style scoped>
.channel-page {
  font-family: 'Shippori Mincho B1', serif;
  color: white;
  text-align: center;
  padding: 2rem;
  z-index: 10;
  position: relative;
}

.channel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.channel-button {
  padding: 1rem;
  border: 2px solid white;
  text-decoration: none;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  transition: background-color 0.3s ease;
  font-family: 'Shippori Mincho B1', serif;
}

.channel-button:hover {
  background-color: rgba(255, 0, 0, 0.2);
}

.channel-button.secondary {
  border-color: #baffc9;
  color: #baffc9;
}

.back-link {
  margin-top: 2rem;
  display: inline-block;
  color: #baffc9;
  text-decoration: underline;
  font-size: 1rem;
}
</style>
