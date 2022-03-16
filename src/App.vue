<template>
    <div class="app">
        <MonthComponent />
    </div>
</template>

<script setup lang="ts">
    import MonthComponent from './components/MonthComponent.vue'
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}


:root {
    --primary-color: rgb(153, 104, 245);
    --green-color: rgb(19, 172, 5);
    --gray-color: rgb(161, 161, 161);
}

div.app {
    width: 100vw;
    height: 100vh;

    display: grid;
    grid-template: 100%;
    grid-template-columns: 100%;
}

</style>

