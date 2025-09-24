<template>
  <div class="card">
    <h2>Vue Micro-Frontend</h2>
    <p><b>Message từ React:</b> {{ messageFromReact || "Chưa có message" }}</p>
    <input v-model="messageToReact" placeholder="Nhập message..." />
    <button @click="sendMessage">Gửi message sang React</button>
  </div>
</template>

<script>
export default {
  data() {
    return { messageFromReact: "", messageToReact: "" };
  },
  mounted() {
    window.addEventListener("react-to-mf", (event) => {
      if(event.detail.sender !== "React") return;
      console.log("Message from React:", event.detail);
      this.messageFromReact = event.detail.message;
    });
  },
  methods: {
    sendMessage() {
      if(!this.messageToReact) return;
      const event = new CustomEvent("mfe-message", {
        detail: {
          sender: "vue-mf",
          message: this.messageToReact,
        },
      });
      window.dispatchEvent(event);

      this.messageToReact = "";
    },
  },
};
</script>

<style>
.card {
  max-width: 400px;
  margin: 30px auto;
  padding: 25px 30px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #333;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
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

.card p {
  margin-bottom: 15px;
  font-size: 15px;
  color: #fff;
  font-weight: 500;
}

.card input {
  width: 85%;
  padding: 8px 12px;
  margin-bottom: 15px;
  border: 2px solid #fff;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card input:focus {
  border-color: #ff7e5f;
  box-shadow: 0 0 8px rgba(255,126,95,0.5);
}

.card button {
  padding: 10px 18px;
  background: #ff7e5f;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.card button:hover {
  background: #feb47b;
  transform: scale(1.05);
}
</style>
