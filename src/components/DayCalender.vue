<template>
    <td 
        v-bind:class="{ 
            'mark' : checkIfMarkThisDay,
            'week-day-gray' : applyGrayColor,
            'today': checkToday
        }"
        v-on:click="$emit('daySelect', dayNumber)">
            <span>{{ padStart(dayNumber) }}</span>
    </td>
</template>

<script setup lang="ts">

import { computed, onBeforeUpdate } from 'vue'
import { getToday } from '../utils/dateUtils'


const props = defineProps(['dataDay', 'month', 'year', 'dayToMark'])
const emit  = defineEmits(['daySelect'])

const { dayNumber, applyGrayColor } = props.dataDay
const { month, year } = props

const todayDate = getToday()

const checkIfMarkThisDay = computed(() => {
    if (applyGrayColor)
        return false

    const strDayNumber = String(dayNumber)
    return props.dayToMark.includes(strDayNumber)
})


const checkToday = computed(() => {
    if (applyGrayColor)
        return false

    return todayDate.day == dayNumber && todayDate.month == props.month && todayDate.year == props.year
})

function padStart(number) {
    return String(number).padStart(2, "0")
}

</script>

<style>

td {
    height: 4rem;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
}

td.week-day-gray {
    color: var(--gray-color);
}

td.today span {
    padding: 7px;
    border-radius: 50%;
    border: 1px solid var(--green-color);
}


td.mark:not(.today) span {
    padding: 6px 7px;
    border-radius: 50%;
    background: var(--green-color);
}

</style>
