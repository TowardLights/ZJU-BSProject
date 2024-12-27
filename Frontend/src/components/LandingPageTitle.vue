<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>

<template>
    <i class="title-container">
        {{ title }}
    </i>
</template>

<style scoped>
.title-container {
    width: 100%;
    font-size: 6.5rem;
    font-weight: 600;
    font-family: Inter;
    color: #000;
    text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    white-space: nowrap;
    /* 确保文本不换行 */
}
</style>