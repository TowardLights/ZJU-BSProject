<script setup>
import LoginBox from '../components/LoginBox.vue'
</script>

<template>
  <main>
    <i>Welcome to PriceCmp!</i>
    <LoginBox class="login-box" />
  </main>
</template>

<style scoped>
i {
  font-size: 6.5rem;
  font-weight: 600;
  font-family: Inter;
  color: #000;
  text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  white-space: nowrap;
  /* 确保文本不换行 */
}

.login-box {
  display: block;
  position: relative;
  left: -20px;
  width: 100%;
  max-width: 300px;
}

@media (max-width: 600px) {
  .login-box {
    margin-top: 60px;
    position: relative;
    left: 0;
    width: 80%;
  }

  i {
    position: relative;
    top: 40px;
    left: -8px;
    font-size: 37px;
  }
}
</style>