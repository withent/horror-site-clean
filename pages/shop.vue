<template>
  <div class="shop-page">
    <h1>🛍 Tシャツ販売ページ</h1>
    <p>こちらからグッズ販売ページにアクセスできます👇</p>

    <a
      href="https://with-ent-h.designstore.jp/search.php?type=item&edit_shop="
      target="_blank"
      rel="noopener"
      class="shop-link"
    >
      👕 Tシャツショップへ
    </a>

    <!-- 戻るリンク -->
    <div class="back-tab">
      <NuxtLink to="/" class="back-link">⬅ トップに戻る</NuxtLink>
    </div>
  </div>
</template>

<script setup>
// 不要な mousemove や maskStyle は default.vue に統合されたので削除
</script>

<style scoped>
.shop-page {
  font-family: 'Shippori Mincho B1', sans-serif;
  color: white;
  padding: 40px;
  min-height: 100vh;
  position: relative;
  z-index: 10;
  text-align: center;
}

.shop-link {
  display: inline-block;
  background-color: #220022;
  color: #ffdddd;
  padding: 12px 24px;
  font-size: 18px;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 20px;
  border: 2px solid #aa00aa;
  box-shadow: 0 0 10px #aa00aa80;
  transition: all 0.2s ease;
}
.shop-link:hover {
  background-color: #440044;
  color: white;
}

.back-tab {
  margin-top: 60px;
}

.back-link {
  display: inline-block;
  margin-top: 2rem;
  color: #baffc9;
  text-decoration: underline;
}

</style>
