<script setup>
import LandingPageTitle from '../components/LandingPageTitle.vue';
import LoginBox from '../components/LoginBox.vue'
</script>

<template>
  <main>
    <LandingPageTitle title="Welcome to PriceCmp!" class="welcome-title" />
    <LoginBox class="login-box" />
  </main>
</template>

<style scoped>
.welcome-title {
  display: block;
  position: relative;
  top: -2rem;
  left: -40px;
}

.login-box {
  display: block;
  position: relative;
  left: -40px;
}
</style>