<template>
  <div class="index-page">
    <h1 class="title">ホラーコンテンツの館</h1>
    <p class="subtitle">
      日本が誇る最高のコンテンツ…<br />
      恐怖と狂気と興奮を、どうぞ体験してください
    </p>

    <div class="link-buttons">
      <!-- 外部系 -->
      <div
        v-for="link in links.slice(0, 2)"
        :key="link.path"
        class="button-with-caption"
      >
        <NuxtLink
          :to="link.path"
          class="scary-button"
          @mouseover="activateSplash($event)"
          @mouseleave="deactivateSplash($event)"
        >
          {{ link.label }}
          <span class="blood-splash"></span>
        </NuxtLink>
        <div class="caption">
          <p v-for="(line, i) in link.caption" :key="i">{{ line }}</p>
        </div>
      </div>

      <!-- 区切り文言 -->
      <div class="divider-label">↓ オリジナルコンテンツ ↓</div>

      <!-- オリジナル系 -->
      <div
        v-for="link in links.slice(2)"
        :key="link.path"
        class="button-with-caption"
      >
        <NuxtLink
          :to="link.path"
          class="scary-button"
          @mouseover="activateSplash($event)"
          @mouseleave="deactivateSplash($event)"
        >
          {{ link.label }}
          <span class="blood-splash"></span>
        </NuxtLink>
        <div class="caption">
          <p v-for="(line, i) in link.caption" :key="i">{{ line }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const links = ref([
  {
    label: "YouTube動画",
    path: "/youtube",
    caption: ['恐怖の動画コレクションを', '一挙公開…']
  },
  {
    label: "怖い体験談",
    path: "/stories",
    caption: ['あなたの身に起きた', '本当にあった怖い話を投稿してね']
  },
  {
    label: 'アップロード動画',
    path: '/upload',
    caption: ['ホラ子のオリジナル動画をアップしているよ',]
  },
  {
    label: 'ホラー画像登録',
    path: '/horror-upload',
    caption: ['ホラ子のオリジナル画像集', '選んでTシャツに出来るよ']
  },
  {
    label: 'Tシャツ販売',
    path: '/shop',
    caption: ['ホラ子のオリジナルTシャツ販売中', ]
  },
  { label: '利用規約', path: '/terms', caption: ['本サイトのご利用にあたって'] },
])

const activateSplash = (event) => {
  const splash = event.currentTarget.querySelector(".blood-splash");
  if (splash) splash.classList.add("active");
};
const deactivateSplash = (event) => {
  const splash = event.currentTarget.querySelector(".blood-splash");
  if (splash) splash.classList.remove("active");
};
</script>

<style scoped>
.index-page {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
  backdrop-filter: brightness(1.1);
}

.title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: "Shippori Mincho B1", serif;
  letter-spacing: 2px;
  background: linear-gradient(
    90deg,
    rgb(230, 99, 24),
    #cc0000,
    #880000,
    rgb(230, 99, 24)
  );
  background-size: 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: bloodFlow 6s linear infinite;
}

@keyframes bloodFlow {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 200%;
  }
}

.subtitle {
  font-size: 1.2rem;
  color: rgb(161, 247, 183);
  font-family: "Shippori Mincho B1", serif;
  margin-bottom: 2rem;
  text-shadow: 0 0 5px rgba(186, 255, 201, 0.4), 0 0 10px rgba(255, 0, 0, 0.2);
  max-width: 600px;
  line-height: 1.8;
  animation: fadeInGhost 3s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInGhost {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.link-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.button-with-caption {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.scary-button {
  position: relative;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  text-decoration: none;
  transition: background-color 0.2s ease;
  overflow: hidden;
  font-family: "Shippori Mincho B1", serif;
}

.scary-button:hover {
  background-color: rgba(255, 0, 0, 0.1);
  cursor: pointer;
}

.caption {
  font-size: 0.9rem;
  color: #c5f0dd;
  font-family: "Shippori Mincho B1", serif;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
  max-width: 240px;
  opacity: 0.8;
}

.divider-label {
  margin: 0rem 0 2rem;
  font-size: 1.5rem;
  color: rgb(248, 240, 124);
  text-shadow: 0 0 6px rgba(255, 255, 255, 0.1);
  font-family: "Shippori Mincho B1", serif;
  text-align: center;
  letter-spacing: 1px;
  opacity: 0.9;
}

.blood-splash {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  background-image: url("/images/blood.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
  transition: opacity 0.3s, transform 0.3s;
  pointer-events: none;
  z-index: 5;
}

.blood-splash.active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
</style>
