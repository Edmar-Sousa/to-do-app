<template>
    <div class="container-information flex">
        <button class="close-button" v-on:click="$emit('show-menu')">X</button>

        <div class="task-of-day-container">
            <h2>Tarefas do dia: {{ date }}</h2>
            <ul>
                <li><span class="hour">10:00</span> Go to shop</li>
                <li><span class="hour">10:00</span> Go to shop</li>
                <li><span class="hour">10:00</span> Go to shop</li>
                <li><span class="hour">10:00</span> Go to shop</li>
                <li><span class="hour">10:00</span> Go to shop</li>
                <li><span class="hour">10:00</span> Go to shop</li>
                <li><span class="hour">10:00</span> Go to shop</li>
                <li><span class="hour">10:00</span> Go to shop</li>
                <li><span class="hour">10:00</span> Go to shop</li>
                <li><span class="hour">10:00</span> Go to shop</li>
                <li><span class="hour">10:00</span> Go to shop</li>
                <li><span class="hour">10:00</span> Go to shop</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">

import { computed } from 'vue'

const emit  = defineEmits(['show-menu'])
const props = defineProps(['dayTask'])

const date = computed(() => {
    return `${props.dayTask.day} de ${props.dayTask.month} de ${props.dayTask.year}`
})

</script>

<style scoped>

div.container-information {
    position: fixed;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    justify-content: center;

    background: var(--primary-color);
    font-family: Roboto, Arial;
    color: var(--white-color);
}

div.task-of-day-container {
    width: 100%;
    flex: 1;
    padding: 20px;
    overflow: hidden;
    justify-content: left;
}

span.hour {
    color: var(--primary-color);
    background: var(--white-color);
    padding: 3px 5px;
    border-radius: 50px;
}

button.close-button {
    position: absolute;
    top: 10px;
    right: 10px;

    font-weight: bold;
    font-size: 2rem;
    
    background: none;
    border: none;
}

.flex {
    display: flex;
    flex-direction: column;
    align-items: center;
}

img {
    width: 130px;
    margin: 20px 0;
}

h2 {
    font-size: 2.5rem;
    margin: 20px 0;
}

li {
    margin: 30px 0;
    font-size: 1.5rem;
    cursor: pointer;
}

ul {
    height: 80%;
    list-style: none;
    overflow-y: auto;
}

ul::-webkit-scrollbar {
    width: 10px;
}

ul::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: var(--white-color);
}

@media (min-width: 768px) {
    div.container-information {
        position: initial;
    }

    button.close-button {
        display: none;
    }
}

</style>
