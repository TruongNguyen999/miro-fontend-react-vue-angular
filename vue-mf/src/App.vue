<template>
  <div class="card">
    <h2>Vue Micro-Frontend</h2>
    <p><b>Message từ React:</b> {{ messageFromReact || "Chưa có message" }}</p>
    <button @click="sendMessage">Gửi message sang React</button>
  </div>
</template>

<script>
export default {
  data() {
    return { messageFromReact: "" };
  },
  mounted() {
    window.addEventListener("micro-message", (e) => {
      if (e.detail.from === "react-root") {
        this.messageFromReact = e.detail.message;
      }
    });
  },
  methods: {
    sendMessage() {
      const event = new CustomEvent("micro-message", {
        detail: {
          from: "vue-mf",
          message: "Xin chào từ Vue app!",
        },
      });
      window.dispatchEvent(event);
    },
  },
};
</script>

<style>
.card {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
}
.card h2 {
  margin-bottom: 15px;
  color: #333;
}
.card p {
  margin-bottom: 15px;
  font-size: 14px;
  color: #555;
}
.card button {
  padding: 10px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
