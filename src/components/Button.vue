<template>
    <button class="change-date-button" v-on:click="$emit('on-click-event')">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">

const emit = defineEmits(['on-click-event'])

</script>

<style scoped>

button.change-date-button {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-color);

    width: 40px;
    height: 40px;

    border-radius: 50%;
    border: none;
    cursor: pointer;

    background: none;
}

button.change-date-button:hover {
    background: rgb(233, 233, 233);
}

</style>
