<template>
    <div class="month-container">
        <div class="calender-header">
            <button 
                class="change-date-button"
                v-on:click="changeMonth(-1)">
                    &#60;
            </button>
            
            <h1 class="title-month">{{ state.currentMonth }} {{ state.currentYear }}</h1>

            <button 
                class="change-date-button" 
                v-on:click="changeMonth(1)">
                    &#62;
            </button>
        </div>

        <table class="weeks-table" cellspacing=0>
            <thead>
                <tr class="header-line">
                    <th>DOM</th>
                    <th>SEG</th>
                    <th>TER</th>
                    <th>QUA</th>
                    <th>QUI</th>
                    <th>SEX</th>
                    <th>SAB</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(week, i) in state.week" v-bind:key="i">
                    <td 
                        v-for="day in week" 
                        v-bind:key="day"
                        v-bind:class="{ 'week-day-gray' : day.applyGrayColor }"
                        v-on:click="$emit('day-add-task', { day: day.dayNumber, month: state.currentMonth, year: state.currentYear })">
                            {{ day.dayNumber }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>

import { ref, reactive, onMounted } from 'vue'

import {
    getCurrentMonthNumber,
    getNameMonth,
    getCurrentYear,
    getCurrentCalender,
    getIndexNextMonth
} from '../utils/dateUtils'


let currentMonthNumber = getCurrentMonthNumber()
let currentYearNumber  = getCurrentYear()


interface DayDataType {
    dayNumber: number
    applyGrayColor: boolean
}

interface CalenderDataType {
    currentMonth: string
    currentYear: number
    week: Array<Array<DayDataType>>
}


const state = reactive({
    currentMonth: String,
    currentYear: 0,
    week: Array<Array<DayDataType>>()
})

const emit = defineEmits(['day-add-task'])

onMounted(() => {
    const calenderData = getCurrentCalender(currentYearNumber, currentMonthNumber)
    setStateData(calenderData)
})


function setStateData(data: CalenderDataType) {
    state.currentMonth = data.currentMonth
    state.currentYear  = data.currentYear
    state.week = data.week
}

function changeMonth(changeValue: number) {
    const newDateMonthAndYear = getIndexNextMonth(currentMonthNumber, currentYearNumber, changeValue)

    currentMonthNumber = newDateMonthAndYear.nextMonthNumber
    currentYearNumber  = newDateMonthAndYear.newYear

    const calenderData = getCurrentCalender(currentYearNumber, currentMonthNumber)
    setStateData(calenderData)
}

</script>


<style scoped>

div.month-container {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 20px;

    font-family: Roboto, Arial, Helvetica, sans-serif;
}

div.calender-header {
    display: flex;
    align-items: center;
}

h1.title-month {
    font-weight: 700;
    font-size: 3rem;
    margin: 0 15px;

    color: var(--primary-color);
}

button.change-date-button {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-color);

    width: 40px;
    height: 40px;

    border-radius: 50%;
    border: none;
    cursor: pointer;

    background: none;
}

button.change-date-button:hover {
    background: rgb(233, 233, 233);
}

table.weeks-table {
    width: 100%;
    margin: 30px 0;
    font-size: 1.6rem;
}

table.weeks-table td {
    height: 4rem;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
}

td.week-day-gray {
    color: var(--gray-color);
}

table.weeks-table tr.header-line {
    height: 40px;
    color: var(--green-color)
}

table.weeks-table tr.header-line th  {
    border-bottom: 1px solid var(--gray-color);
}


span.mark {
    padding: 6px 7px;
    border-radius: 50%;
    background: var(--green-color);
}

</style>