<template>
    <div class="add-task-container">
        <InputComponent nameInput="hora"   v-model="hourInputValue" v-bind:inputValue="hourInputValue"/>
        <InputComponent nameInput="Tarefa" v-model="taskInputValue" v-bind:inputValue="taskInputValue"/>

        <button class="add-task-btn" v-on:click="addTaskInDatabase">
            <i class="fas fa-plus"></i>
        </button>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import InputComponent from './InputComponent.vue'

import { showNotificationOrAlert } from '../utils/Notification'

const hourInputValue = ref('')
const taskInputValue = ref('')

const emit = defineEmits(['add-new-task'])


function addTaskInDatabase() {
    if (hourInputValue.value == '' || taskInputValue.value == '') {
        showNotificationOrAlert('Preencha todos os campos!')
        return
    }

    const hourIsValid = /^([0-1][0-9]|2[0-5]):[0-5][0-9]$/.test(hourInputValue.value)
    if (!hourIsValid) {
        showNotificationOrAlert('O horario da tarefa não corresponde ao formato de 24h')
        return
    }

    emit('add-new-task', { 
        hourInputValue: hourInputValue.value,
        taskInputValue: taskInputValue.value
    })

    hourInputValue.value = ''
    taskInputValue.value = ''
}

</script>

<style scoped>

div.add-task-container {
    display: flex;
}

div.add-task-container div:first-child {
    width: 70px;
}

div.add-task-container div:nth-child(2) {
    flex: 1;
}


button.add-task-btn {
    width: 30px;
    height: 30px;

    font-weight: bold;
    font-size: 1.5rem;

    cursor: pointer;

    border-radius: 15px;
    border: none;
    background: none;
}

button.add-task-btn:hover {
    background: var(--white-color);
}

</style>
