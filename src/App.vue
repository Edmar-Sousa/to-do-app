<template>
    <div class="app">
        <DayInformations v-if="state.showOrHiddenTaskList || isMobile" v-on:show-menu="hiddenMenu"/>
        <MonthComponent v-on:day-add-task="showMenuTask"/>
    </div>
</template>

<script setup lang="ts">

import { reactive, onMounted, computed } from 'vue'

import DayInformations from './components/DayInformations.vue'
import MonthComponent  from './components/MonthComponent.vue'


const state = reactive({
    showOrHiddenTaskList: true,
    windowWidth: 0
})

onMounted(() => {
    window.addEventListener('resize', () => {
        state.windowWidth = window.innerWidth
    })
})

const isMobile = computed(() => state.windowWidth < 768 ? false : true)

function showMenuTask(dayNumber) {
    console.log(dayNumber)

    if (isMobile)
        state.showOrHiddenTaskList = true
}

function hiddenMenu() {
    state.showOrHiddenTaskList = false
}

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}


html {
    font-size: 62.5%;
    --primary-color: rgb(153, 104, 245);
    --white-color: white;
    --green-color: rgb(19, 172, 5);
    --gray-color: rgb(161, 161, 161);
}

body {
    font-size: 1.6rem;
}

div.app {
    position: relative;

    width: 100vw;
    height: 100vh;

    display: flex;

    font-size: 0.5vw;
}

@media (min-width: 768px) {
    div.app {
        display: grid;
        grid-template-columns: 40% auto;
        grid-template-rows: 100%;
    }
}

@media (max-width: 1024px) {
    html {
        font-size: 56%;
    }
}

@media (min-width: 1440px) {
    html {
        font-size: 100%;
    }
}

</style>

