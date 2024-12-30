<script setup>
import UserInfo from '@/components/UserInfo.vue';
import ChangeUsername from '@/components/ChangeUsername.vue';
import ChangePassword from '@/components/ChangePassword.vue';
import PriceAlert from '@/components/PriceAlert.vue';
import LogoutButton from '@/components/LogoutButton.vue';
</script>

<template>
    <div class="user-center-view">
        <UserInfo />
        <ChangeUsername />
        <ChangePassword />
        <PriceAlert />
        <LogoutButton />
    </div>
</template>

<style scoped>
.user-center-view {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: hwb(18 44% 4% / 0.954);
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 20%;
    left: 35%;
}

@media (max-width: 600px) {
    .user-center-view {
        position: relative;
        top: 5rem;
        left: 0;
    }
}
</style>