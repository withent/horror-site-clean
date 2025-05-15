<template>
  <div class="stories-page">
    <h1>👻 怖い体験談スレッド 👻</h1>

    <!-- 投稿フォーム -->
    <form @submit.prevent="submitStory" class="form">
      <input
        v-model="nickname"
        type="text"
        placeholder="ニックネーム"
        required
      />
      <input v-model="title" type="text" placeholder="タイトル" required />
      <textarea
        v-model="content"
        placeholder="本文を入力..."
        rows="4"
        required
      ></textarea>
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
        <p>🧑 {{ story.nickname }} ｜📅 {{ story.timestamp }}</p>
        <p>{{ story.content }}</p>

        <!-- コメント欄 -->
        <div class="comments">
          <h4>💬 コメント</h4>
          <ul>
            <li v-for="(comment, index) in story.comments" :key="index">
              {{ comment }}
            </li>
          </ul>
          <input
            v-model="story.newComment"
            @keyup.enter="addComment(story)"
            placeholder="コメントを入力してEnter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const title = ref("");
const content = ref("");
const nickname = ref("");
const stories = reactive([]);

function submitStory() {
  stories.unshift({
    id: Date.now(),
    title: title.value,
    content: content.value,
    nickname: nickname.value,
    timestamp: new Date().toLocaleString(),
    comments: [],
    newComment: "",
  });
  title.value = "";
  content.value = "";
  nickname.value = "";
}

function addComment(story) {
  if (story.newComment.trim()) {
    story.comments.push(story.newComment.trim());
    story.newComment = "";
  }
}
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
