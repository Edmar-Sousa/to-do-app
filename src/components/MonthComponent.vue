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
                        v-bind:class="{ 
                            'mark' : checkIfMarkThisDay(day),
                            'week-day-gray' : day.applyGrayColor, 
                            'today' : today(day, state.currentMonth, state.currentYear) 
                        }"
                        v-on:click="$emit('day-add-task', { day: day.dayNumber, month: state.currentMonth, year: state.currentYear })">
                            <span>{{ fillNumberCalender(day.dayNumber) }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>

import { ref, reactive, onMounted, onBeforeUpdate } from 'vue'

import {
    getCurrentMonthNumber,
    getNameMonth,
    getCurrentYear,
    getCurrentCalender,
    getIndexNextMonth,
    getToday
} from '../utils/dateUtils'

import { getDaysWithTask } from '../utils/localStore'

let currentMonthNumber = getCurrentMonthNumber()
let currentYearNumber  = getCurrentYear()

const todayDate = getToday()

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

const props = defineProps(['update'])
const emit  = defineEmits(['day-add-task'])

let listDaysWithTaskToMark = []

onMounted(() => {
    const calenderData = getCurrentCalender(currentYearNumber, currentMonthNumber)
    setStateData(calenderData)
    getDaysListWithTask()
})


onBeforeUpdate(() => {
    getDaysListWithTask()
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
    getDaysListWithTask()
}


function today(day, month, year) {
    if (!day.applyGrayColor)
        return todayDate.day == day.dayNumber && todayDate.month == month && todayDate.year == year

    return false
}

function fillNumberCalender(number) {
    return String(number).padStart(2, "0")
}

function getDaysListWithTask() {
    const year  = String(state.currentYear)
    const month = state.currentMonth

    listDaysWithTaskToMark = getDaysWithTask(year, month)
}


function checkIfMarkThisDay(day) {
    if (day.applyGrayColor)
        return false

    const strDayNumber = String(day.dayNumber)
    return listDaysWithTaskToMark.includes(strDayNumber)
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


td.mark:not(.today) span {
    padding: 6px 7px;
    border-radius: 50%;
    background: var(--green-color);
}

td.today span {
    padding: 7px;
    border-radius: 50%;
    border: 1px solid var(--green-color);
}

</style>