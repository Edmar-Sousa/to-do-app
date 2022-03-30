<template>
    <div class="month-container">
        <div class="calender-header">
            <ButtonComponent v-on:change-month="changeMonth(-1)">
                &#60;
            </ButtonComponent>
            
            <h1 class="title-month">{{ state.currentMonth }} {{ state.currentYear }}</h1>

            <ButtonComponent v-on:change-month="changeMonth(1)">
                &#62;
            </ButtonComponent>
        </div>

        <table class="weeks-table" cellspacing="0">
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
                    <DayCalender 
                        v-for="day in week" 
                        v-bind:key="day.dayNumber" 
                        v-bind:dataDay="day"
                        v-bind:month="state.currentMonth"
                        v-bind:year="state.currentYear"
                        v-bind:dayToMark="listDaysWithTaskToMark"
                        v-on:daySelect="emitEventSelectDay" />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>

import { ref, reactive, onMounted, onBeforeUpdate } from 'vue'

import ButtonComponent from './Button.vue'
import DayCalender from './DayCalender.vue'

import {
    getCurrentMonthNumber,
    getNameMonth,
    getCurrentYear,
    getCurrentCalender,
    getIndexNextMonth,
} from '../utils/dateUtils'

import { getDaysWithTask } from '../utils/localStore'

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

const props = defineProps(['update'])
const emit  = defineEmits(['day-add-task'])

let listDaysWithTaskToMark = ref([])

onMounted(() => {
    const calenderData = getCurrentCalender(currentYearNumber, currentMonthNumber)
    setStateData(calenderData)
    getDaysListWithTask()
})


onBeforeUpdate(() => {
    getDaysListWithTask()
})

function emitEventSelectDay(dayNumber) {
    const dataToEmit = {
        day  : dayNumber,
        month: state.currentMonth,
        year : state.currentYear
    }

    emit('day-add-task', dataToEmit)
}

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


function getDaysListWithTask() {
    const year  = String(state.currentYear)
    const month = state.currentMonth

    listDaysWithTaskToMark.value = getDaysWithTask(year, month)
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

table.weeks-table {
    width: 100%;
    margin: 30px 0;
    font-size: 1.6rem;
}


table.weeks-table tr.header-line {
    height: 40px;
    color: var(--green-color)
}

table.weeks-table tr.header-line th  {
    border-bottom: 1px solid var(--gray-color);
}


</style>