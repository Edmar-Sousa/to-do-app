interface TaskType {
    hour : string
    task : string
    check: boolean
}

function newTaskObject(hour: string, task: string) : TaskType {
    const newTaskObject = {
        hour,
        task,
        check: false
    }

    return newTaskObject
}


function createObject(keyObject: string, valueObject: any) {
    const dayObject = {}
    dayObject[keyObject] = valueObject

    return dayObject
}

function addObjectInLocalStorage(yearKey: string, monthObject: any) {
    const objectString = JSON.stringify({ ...monthObject })
    window.localStorage.setItem(yearKey, objectString)
}

interface DataType {
    day : string
    month: string
    dayData: Array<TaskType>
    monthData: {}
    oldMonth: {}
}

function addTask(task: string, hour: string, data: DataType, year: string) {
    let { day, month, dayData, monthData, oldMonth } = data

    dayData.push(newTaskObject(hour, task))
    monthData[day] = dayData
    const monthObject = createObject(month, monthData)

    addObjectInLocalStorage(year, { 
        ...oldMonth,
        ...monthObject
    })
}

function checkExistKeyInObject(object: Object, key: string) {
    return Object.keys(object).includes(key)
}

function getKeyYear(year: string) {
    const yearString = window.localStorage.getItem(year)

    if (yearString)
        return JSON.parse(yearString)
}

function getMonthIfExists(yearObject: Object, month: string) {
    const monthExists = checkExistKeyInObject(yearObject, month)
    let monthToReturn = {}

    if (monthExists)
        monthToReturn = yearObject[month]

    return monthToReturn
}

function getDayIfExists(monthObject: Object, day: string) {
    const dayExists = checkExistKeyInObject(monthObject, day)
    let dayToReturn = []

    if (dayExists)
        dayToReturn = monthObject[day]

    return dayToReturn
}

export function addTaskIntoLocalStorage(task: string, hour: string, day: string, month: string, year: string) {
    const yearObject = getKeyYear(year)

    if (yearObject) {
        const monthObject = getMonthIfExists(yearObject, month)
        const dayObject   = getDayIfExists(monthObject, day)

        const data = {
            day,
            month,
            dayData: dayObject,
            monthData: monthObject,
            oldMonth: yearObject
        }

        addTask(task, hour, data, year)
    }

    else {
        const data = {
            day,
            month,
            dayData: [],
            monthData: {},
            oldMonth: {}
        }

        addTask(task, hour, data, year)
    }
}


export function getTaskOfYearMonthAndDay(year: string, month: string, day: string) {
    const yearObject = getKeyYear(year)

    if (yearObject) {
        return yearObject[month][day]
    }

    return []
}
