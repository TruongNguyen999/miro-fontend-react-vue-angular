<template>
  <div class="card">
    <h2>Vue Micro-Frontend</h2>

    <input v-model="messageToSend" placeholder="Nhập message..." />
    <button @click="sendMessage">Thêm message</button>

    <ul>
      <li v-for="(m, i) in messages" :key="i">{{ m }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Load shared-store từ SystemJS (dùng chung với React & Angular)
let store;
const messages = ref([]);
const messageToSend = ref("");

// Subcribe khi component mount
onMounted(async () => {
  const mod = await System.import("shared-store");
  store = mod.store;

  // sync state lần đầu
  messages.value = store.value.messages;

  // subscribe khi state thay đổi
  store.state$.subscribe((state) => {
    messages.value = state.messages;
  });
});

onBeforeUnmount(() => {
  // Vue không cần unsubscribe vì BehaviorSubject sẽ giữ, 
  // nhưng tốt nhất cleanup nếu muốn
  // subscription.unsubscribe();
});

const sendMessage = () => {
  if (!messageToSend.value) return;
  store.setState({
    ...store.value,
    messages: [...store.value.messages, `From Vue: ${messageToSend.value}`],
  });
  messageToSend.value = "";
};
</script>

<style>
.card {
  max-width: 420px;
  margin: 40px auto;
  padding: 25px 30px;
  border-radius: 16px;
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
  color: #333;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
}

.card h2 {
  margin-bottom: 18px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.card input {
  width: 80%;
  padding: 10px 12px;
  margin-bottom: 12px;
  border: 2px solid #fff;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card input:focus {
  border-color: #fff;
  box-shadow: 0 0 8px rgba(255,255,255,0.6);
}

.card button {
  padding: 10px 20px;
  background: #fff;
  color: #66a6ff;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card button:hover {
  background: #f0f0f0;
  transform: scale(1.05);
}

.card ul {
  margin-top: 20px;
  padding-left: 0;
  list-style: none;
  text-align: left;
}

.card ul li {
  background: rgba(255, 255, 255, 0.85);
  margin: 6px 0;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card ul li:nth-child(even) {
  background: rgba(255, 255, 255, 0.95);
}
</style>
