<template>
    <div>
        <span class="hour">{{ task.hour }}</span>
        <span v-bind:class="{ 'checked': task.check }">{{ task.task }}</span>
    </div>

    <div class="tasks-options">
        <i class="fas fa-trash" v-on:click="$emit('delete-task')"></i>
        <i class="fas fa-check-circle" v-on:click="$emit('mark-task-with-check')"></i>
    </div>
</template>

<script setup lang="ts">

const emit  = defineEmits(['delete-task', 'mark-task-with-check'])
const props = defineProps(['task'])


</script>

<style>

div.tasks-options {
    display: none;
}

div.tasks-options i {
    font-size: 2rem;
    margin-right: 15px;
}

span.hour {
    color: var(--primary-color);
    background: var(--white-color);
    padding: 3px 5px;
    margin-right: 10px;
    border-radius: 50px;
}

span.checked {
    text-decoration: line-through;
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

</style>
