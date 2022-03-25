<template>
    <div class="input-container">
        <input type="text" 
            v-bind:id="`input-${nameInput}`" placeholder="-" 
            v-on:input="$emit('update:modelValue', $event.target.value)"
        />

        <label v-bind:for="`input-${nameInput}`">{{ nameInput }}</label>
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['nameInput', 'modelValue'])
const emit  = defineEmits(['update:modelValue'])

</script>

<style scoped>

div.input-container {
    position: relative;
    padding: 0 5px;
}

div.input-container input {
    border: none;

    width: 100%;
    height: 25px;

    margin-top: 5px;

    font-size: 1.5rem;
    outline: none;

    padding-left: 5px;

    border-bottom: 2px solid var(--white-color);
    background: none;
}

div.input-container label {
    position: absolute;

    font-size: 17px;
    left: 5px;
    top: 2px;

    transition: 400ms;
}

input:focus + label {
    top: -15px;
}

input::placeholder {
    color: #0000;
}

input:not(:placeholder-shown) + label {
    top: -15px;
}

</style>
