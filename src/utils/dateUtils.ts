const months = [
    'JANEIRO', 'FEVEREIRO', 'MARÇO', 
    'ABRIL', 'MAIO', 'JUNHO', 
    'JULHO', 'AGOSTO', 'SETEMBRO',
    'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
]

const daysNames = [
    'DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'
]

const monthMaxDays = [
    { max_days: 31 }, // JANEIRO
    { max_days: 28 }, // FEVEREIRO
    { max_days: 31 }, // MARCO
    { max_days: 30 }, // ABRIL
    { max_days: 31 }, // MAIO
    { max_days: 30 }, // JUNHO
    { max_days: 31 }, // JULHO
    { max_days: 31 }, // AGOSTO
    { max_days: 30 }, // SETEMBRO
    { max_days: 31 }, // OUTUBRO
    { max_days: 30 }, // NOVEMBRO
    { max_days: 31 }, // DEZEMBRO
]

const VALUE_MONTH_INIT_OF_YEAR = 0, VALUE_MONTH_END_OF_YEAR = 11
const FIRST_DAY = 1, WEEKS_OF_MONTH_COUNT = 6, DAY_OF_WEEK_COUNT = 7

interface MonthDataType {
    oldMonthMaxDay: number
    currentMonthMaxDay: number
    firstMonthWeekStartInDay: number
    indexWeekDayFirstDayMonth: number
}

interface DayDataType {
    dayNumber: number
    applyGrayColor: boolean
}


export function getCurrentMonthNumber() {
    const monthNumber = new Date().getMonth()
    return monthNumber
}

export function getCurrentYear() {
    const year = new Date().getFullYear()
    return year
}

export function getNameMonth(monthNumber: number) {
    if (typeof(monthNumber) === 'number')
        return months[monthNumber]

    return monthNumber
}

export function getIndexNextMonth(monthNumber : number, year: number, valueToAdd: number) {
    let nextMonthNumber = monthNumber + valueToAdd

    if (nextMonthNumber > VALUE_MONTH_END_OF_YEAR) {
        nextMonthNumber = VALUE_MONTH_INIT_OF_YEAR
        year++
    }

    else if (nextMonthNumber < VALUE_MONTH_INIT_OF_YEAR) {
        nextMonthNumber = VALUE_MONTH_END_OF_YEAR
        year--
    }

    return { nextMonthNumber, newYear: year }
}


export function getNumberMonthWithName(monthName : string) {
    return months.findIndex(month => month === monthName)
}


function getNameDay(year: number, month : number, day : number) {
    const date = new Date(year, month, day)
    const dayName = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(date).toString().substr(0, 3).toUpperCase()

    return dayName
}

export function getIndexDayWithNumberDayFromMonth(year: number, month : number, day : number) {
    const dayName = getNameDay(year, month, day)
    return daysNames.findIndex(day => day === dayName)
}


export function getMaxDayOldMonth(month: number, year: number) {
    const oldIndexMonth  = getIndexNextMonth(month, year, -1).nextMonthNumber
    const oldMonthMaxDay = monthMaxDays[oldIndexMonth].max_days

    return oldMonthMaxDay
}


export function generateWeeksOfMonth(monthData : MonthDataType) {
    let monthWeeks = Array<Array<DayDataType>>()

    let dayInitialCount = monthData.firstMonthWeekStartInDay + 1
    let resetIToWhenEquals = monthData.oldMonthMaxDay
    let grayColor = true

    for (let weekCount = 0; weekCount < WEEKS_OF_MONTH_COUNT; weekCount++) {
        const week = Array<DayDataType>()

        for (let dayCount = 0; dayCount < DAY_OF_WEEK_COUNT; dayCount++) {
            if (dayInitialCount > resetIToWhenEquals) {
                dayInitialCount = 1
                resetIToWhenEquals = monthData.currentMonthMaxDay
                grayColor = !grayColor
            }
        
            week.push({
                dayNumber: dayInitialCount,
                applyGrayColor: grayColor
            })
            dayInitialCount++
        }

        monthWeeks.push(week)
    }

    return monthWeeks
}


export function getWeeksOfMonth(year : number, month: number) {
    const oldMonthMaxDay = getMaxDayOldMonth(month, year)
    const currentMonthMaxDay = monthMaxDays[month].max_days

    const indexWeekDayFirstDayMonth = getIndexDayWithNumberDayFromMonth(year, month, FIRST_DAY)
    const firstMonthWeekStartInDay = oldMonthMaxDay - indexWeekDayFirstDayMonth

    const monthData = {
        oldMonthMaxDay,
        indexWeekDayFirstDayMonth,
        currentMonthMaxDay,
        firstMonthWeekStartInDay
    }

    const week = generateWeeksOfMonth(monthData)

    return week
}

export function getToday() {
    const stringToday = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date())
    // sexta-feira, 25 de marco de 2022
    const splitDate = stringToday.split(' ')

    const day   = splitDate[1]               // 1 -> index of day
    const month = splitDate[3].toUpperCase() // 3 -> index of month
    const year  = splitDate[5]               // 5 -> index of year

    return { 
        day  : Number(day), 
        month: getNumberMonthWithName(month), 
        year : Number(year)
    }
}

export function getCurrentCalender(year : number, month: number) {
    const currentYear  = year
    const currentMonth = getNameMonth(month)

    const week = getWeeksOfMonth(year, month)

    const calenderData = {
        currentMonth,
        currentYear,
        week
    }

    return calenderData
}