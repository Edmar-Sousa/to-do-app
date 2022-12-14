<template>
    <div class="container-information flex">
        <button class="close-button" v-on:click="$emit('show-menu')">X</button>

        <div class="task-of-day-container">
            <h2>Tarefas do dia: {{ date }}</h2>

            <AddTaskComponent v-on:add-new-task="addTaskInDatabase" />

            <ul v-show="listOfTask.length > 0">
                <li v-for="(task, i) in listOfTask" v-bind:key="i">
                    <TaskComponent 
                        v-bind:task="task" 
                        v-on:delete-task="deleteTask(i)"
                        v-on:mark-task-with-check="markTaskWithCheck(i, task.check)"/>
                </li>
            </ul>

            <p v-show="listOfTask.length <= 0" class="not-task-message">
                <i class="fas fa-exclamation-circle"></i>
                Não tem tarefas para hoje, aproveite seu tempo livre!
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue'

import { showNotification } from '../utils/Notification'
import AddTaskComponent from './AddTaskComponent.vue'
import TaskComponent    from './TaskComponent.vue'

import { 
    addTaskIntoLocalStorage, 
    getTaskOfYearMonthAndDay,
    markTaskCheckOfYearMonthAndDay,
    deleteTaskOfYearMonthAndDay,
} from '../utils/localStore'
import { getNameMonth } from '../utils/dateUtils';

const emit  = defineEmits(['show-menu', 'update-month'])
const props = defineProps(['dayTask'])

const date = computed(() => { 
    const monthName = getNameMonth(props.dayTask.month)
    getTasks()
    return `${props.dayTask.day} de ${monthName} de ${props.dayTask.year}`
})

interface TaskType {
    hour: string
    check: boolean
    task: string
}

interface TaskEventType { 
    hourInputValue: string
    taskInputValue: string
}

const listOfTask = ref(Array<TaskType>())

function getTasks() {
    const year  = props.dayTask.year
    const month = getNameMonth(props.dayTask.month)
    const day   = props.dayTask.day

    listOfTask.value = getTaskOfYearMonthAndDay(year, month, day)
}


function addTaskInDatabase(newTask: TaskEventType) {
    const { hourInputValue, taskInputValue } = newTask

    const task = taskInputValue
    const hour = hourInputValue
    const day  = String(props.dayTask.day)
    const month= getNameMonth(props.dayTask.month)
    const year = String(props.dayTask.year)

    addTaskIntoLocalStorage(task, hour, day, month, year)
    getTasks()

    emit('update-month')
}


function markTaskWithCheck(index: number, checkUpdate: boolean) {
    const day   = props.dayTask.day
    const month = getNameMonth(props.dayTask.month)
    const year  = props.dayTask.year
    const check = !checkUpdate

    const result = markTaskCheckOfYearMonthAndDay(year, month, day, index, check)

    if (result == null)
        showNotification(`Erro ao atualizar a tarefa do dia: ${day} de ${month} de ${year}`)

    listOfTask.value = result
}

function deleteTask(indexTask: number) {
    const day   = props.dayTask.day
    const month = getNameMonth(props.dayTask.month)
    const year  = props.dayTask.year

    const result = deleteTaskOfYearMonthAndDay(year, month, day, indexTask)

    if (result == null)
        showNotification(`Erro ao deletar a tarefa do dia: ${day} de ${month} de ${year}`)

    else {
        listOfTask.value = result
        emit('update-month')
    }
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

p.not-task-message {
    margin-top: 20px;
    font-size: 1.6rem;
}

p.not-task-message i {
    font-size: 1.8rem;
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
