<template>

    <Transition>
        <div class="modal-container" v-show="showModal">
            <div class="alert-container">
                <div class="alert-header">                    
                    <h3>
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        Alerta
                    </h3>

                    <ButtonComponent v-on:on-click-event="closeModal">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </ButtonComponent>
                </div>

                <div class="body-modal">
                    <p>{{ messageModal }}</p>
                </div>
            </div>
        </div>
    </Transition>

</template>

<script lang="ts" setup>

import ButtonComponent from './Button.vue'

import { showModal, messageModal, closeModal } from '../utils/Notification'

</script>

<style scoped>

div.modal-container {
    position: absolute;
    z-index: 10;

    background: var(--modal-background);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: Roboto, Arial, Helvetica, sans-serif;
}

div.alert-container {
    max-width: 500px;
    width: 90%;
    padding: 20px;

    border-radius: 5px;

    background: var(--white-color);
}

div.alert-header {
    font-size: 2rem;
     
    display: flex;
    align-items: center;
    justify-content: space-between;
}

div.body-modal p {
    font-size: 1.7rem;
    margin: 1rem 0;
}

.v-enter-active, .v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
}

</style>
