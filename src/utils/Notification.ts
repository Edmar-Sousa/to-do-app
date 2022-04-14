import { ref } from 'vue'


export const showModal    = ref(false)
export const messageModal = ref('')

export function showNotification(message: string) {
    showModal.value    = true
    messageModal.value = message
}

export function closeModal() {
    showModal.value    = false
    messageModal.value = ''
}