<template>
  <div class="stories-page">
    <h1>👻 怖い体験談スレッド 👻</h1>

    <!-- 投稿フォーム -->
    <form @submit.prevent="submitStory" class="form">
      <input v-model="nickname" type="text" placeholder="ニックネーム" required />
      <input v-model="title" type="text" placeholder="タイトル" required />
      <textarea v-model="content" placeholder="本文を入力..." rows="4" required></textarea>
      <button type="submit">投稿する</button>
    </form>

    <!-- トップページに戻るボタン -->
    <div style="text-align: center">
      <NuxtLink to="/" class="back-link">⬅ トップに戻る</NuxtLink>
    </div>

    <!-- 投稿一覧 -->
    <div v-if="stories.length" class="story-list">
      <div class="story" v-for="story in stories" :key="story.id">
        <h3>{{ story.title }}</h3>
        <p>🧑 {{ story.nickname }} ｜📅 {{ formatDate(story.created_at) }}</p>
        <p>{{ story.content }}</p>

        <!-- コメント欄（保存なし）-->
        <div class="comments">
          <h4>💬 コメント</h4>
          <ul>
            <li v-for="(comment, index) in story.comments" :key="index">{{ comment }}</li>
          </ul>
          <input
            v-model="story.newComment"
            @keyup.enter="addComment(story)"
            placeholder="コメントを入力してEnter"
          />
        </div>

        <!-- 削除ボタン -->
        <button @click="deleteStory(story.id)" style="margin-top: 1rem; color: red;">
          🗑 この投稿を削除
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stories = ref([])
const title = ref('')
const content = ref('')
const nickname = ref('')

// 投稿を取得する関数
const loadStories = async () => {
  const res = await fetch('/api/stories')
  const { data, error } = await res.json()

  console.log('🔥 Supabase API レスポンス:', data)

  if (Array.isArray(data)) {
    stories.value = data.map((story) => ({
      id: story.id,
      nickname: story.nickname ?? '名無し',
      title: story.title,
      content: story.content,
      created_at: story.created_at,
      comments: [],
      newComment: ''
    }))
    console.log('🧪 stories.value:', stories.value)
  } else {
    console.warn('📛 投稿データの取得に失敗しました:', error ?? data)
    stories.value = []
  }
}



// 投稿送信
const submitStory = async () => {
  console.log('🟢 送信データ確認:', {
    nickname: nickname.value,
    title: title.value,
    content: content.value,
  })

  const res = await fetch('/api/stories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nickname: nickname.value,
      title: title.value,
      content: content.value,
    }),
  })

  const json = await res.json()
  console.log('📝 投稿APIレスポンス:', json)

  nickname.value = ''
  title.value = ''
  content.value = ''
  await loadStories()
}



// 削除
const deleteStory = async (id) => {
  await fetch(`/api/stories/${id}`, {
    method: 'DELETE'
  })
  await loadStories()
}

// コメント追加（保存なしの仮機能）
const addComment = (story) => {
  if (story.newComment.trim()) {
    story.comments.push(story.newComment.trim())
    story.newComment = ''
  }
}

// 日付整形
const formatDate = (iso) => {
  return new Date(iso).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 初期ロード
onMounted(loadStories)
</script>

<style scoped>
.stories-page {
  font-family: "Shippori Mincho B1", sans-serif;
  color: white;
  padding: 2rem;
  min-height: 100vh;
  position: relative;
  z-index: 10;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.form input,
.form textarea {
  padding: 0.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  border-bottom: 2px solid white;
}

.form button {
  padding: 0.7rem;
  background-color: rgba(255, 0, 0, 0.3);
  color: white;
  border: none;
  cursor: pointer;
  font-family: "Shippori Mincho B1", serif;
}

.back-link {
  display: inline-block;
  margin-top: 2rem;
  color: #baffc9;
  text-decoration: underline;
  text-align: center;
}

.story-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.story {
  padding: 1rem;
  border: 2px solid white;
  background: rgba(0, 0, 0, 0.3);
}

.comments input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-bottom: 1px solid white;
  color: white;
}
</style>
