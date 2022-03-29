<template>
    <td 
        v-bind:class="{ 
            'mark' : checkIfMarkThisDay(),
            'week-day-gray' : applyGrayColor,
            'today': checkToday()
        }"
        v-on:click="$emit('day-select', dataToEmit)">
            <span>{{ padStart(dayNumber) }}</span>
    </td>
</template>

<script setup lang="ts">

import { getToday } from '../utils/dateUtils'


const props = defineProps(['dataDay', 'month', 'year', 'dayToMark'])
const emit  = defineEmits(['day-select'])

const { dayNumber, applyGrayColor } = props.dataDay
const { month, year } = props

const dataToEmit = { 
    day   : dayNumber, 
    month, 
    year
}

const todayDate = getToday()
let listDaysWithTaskToMark = props.dayToMark


function checkIfMarkThisDay() {
    if (applyGrayColor)
        return false

    const strDayNumber = String(dayNumber)
    return listDaysWithTaskToMark.includes(strDayNumber)
}


function checkToday() {
    if (!applyGrayColor)
        return todayDate.day == dayNumber && todayDate.month == month && todayDate.year == year

    return false
}

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
