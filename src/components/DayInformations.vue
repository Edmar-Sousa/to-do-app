<template>
    <div class="container-information flex">
        <button class="close-button" v-on:click="$emit('show-menu')">X</button>

        <div class="task-of-day-container">
            <h2>Tarefas do dia: {{ date }}</h2>

            <div class="add-task-container">
                <InputComponent nameInput="hora"   v-model="hourInputValue" />
                <InputComponent nameInput="Tarefa" v-model="taskInputValue" />

                <button class="add-task-btn" v-on:click="addTaskInDatabase">
                    <i class="fas fa-plus"></i>
                </button>
            </div>

            <ul v-if="listOfTask.length > 0">
                <li v-for="(task, i) in listOfTask" v-bind:key="i">
                    <div>
                        <span class="hour">{{ task.hour }}</span>
                        <span v-bind:class="{ 'checked': task.check }">{{ task.task }}</span>
                    </div>

                    <div class="tasks-options">
                        <i class="fas fa-trash"></i>
                        <i class="fas fa-check-circle" v-on:click="markTaskWithCheck(i, task.check)"></i>
                    </div>
                </li>
            </ul>

            <p v-else class="not-task-message">
                <i class="fas fa-exclamation-circle"></i>
                Não tem tarefas para hoje, aproveite seu tempo livre!
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

import { computed, ref, onMounted } from 'vue'

import InputComponent from './InputComponent.vue'
import { showNotificationOrAlert } from '../utils/Notification'
import { 
    addTaskIntoLocalStorage, 
    getTaskOfYearMonthAndDay,
    markTaskCheckOfYearMonthAndDay,
} from '../utils/localStore'

const emit  = defineEmits(['show-menu'])
const props = defineProps(['dayTask'])

const date = computed(() => { 
    getTasks()
    return `${props.dayTask.day} de ${props.dayTask.month} de ${props.dayTask.year}`
})

const hourInputValue = ref('')
const taskInputValue = ref('')
const listOfTask = ref([])


function getTasks() {
    const year  = props.dayTask.year
    const month = props.dayTask.month
    const day   = props.dayTask.day

    listOfTask.value = getTaskOfYearMonthAndDay(year, month, day)
}


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
    
    const task = taskInputValue.value
    const hour = hourInputValue.value
    const day  = props.dayTask.day
    const month= props.dayTask.month
    const year = props.dayTask.year

    addTaskIntoLocalStorage(task, hour, day, month, year)
    getTasks()
}


function markTaskWithCheck(index, checkUpdate) {
    const day   = props.dayTask.day
    const month = props.dayTask.month
    const year  = props.dayTask.year
    const check = !checkUpdate

    const result = markTaskCheckOfYearMonthAndDay(year, month, day, index, check)

    if (result == null)
        showNotificationOrAlert(`Erro ao atualizar a tarefa do dia: ${day} de ${month} de ${year}`)

    listOfTask.value = result
}

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

div.add-task-container {
    display: flex;
}

div.add-task-container div:first-child {
    width: 70px;
}

div.add-task-container div:nth-child(2) {
    flex: 1;
}

p.not-task-message {
    margin-top: 20px;
    font-size: 1.6rem;
}

p.not-task-message i {
    font-size: 1.8rem;
}

div.tasks-options i {
    font-size: 2rem;
    margin-right: 15px;
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

span.hour {
    color: var(--primary-color);
    background: var(--white-color);
    padding: 3px 5px;
    margin-right: 10px;
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
    margin: 20px 0;
    font-size: 1.5rem;
    cursor: pointer;

    height: 30px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

span.checked {
    text-decoration: line-through;
}

li div.tasks-options {
    display: none;
}

i.fa-trash:hover {
    transition: 400ms;
    color: rgb(184, 8, 8);
}

i.fa-check-circle:hover {
    transition: 400ms;
    color: rgb(13, 100, 4);
}

li:hover div.tasks-options {
    display: block;
}

ul {
    height: 80%;
    margin-top: 10px;
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
