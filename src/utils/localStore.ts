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


function addTask(task: TaskType, data: DataType, year: string) {
    let { day, month, dayData, monthData, oldMonth } = data

    dayData.push(task)
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
    const taskToAdd  = newTaskObject(hour, task)

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

        addTask(taskToAdd, data, year)
    }

    else {
        const data = {
            day,
            month,
            dayData: [],
            monthData: {},
            oldMonth: {}
        }

        addTask(taskToAdd, data, year)
    }
}


export function getTaskOfYearMonthAndDay(year: string, month: string, day: string) {
    const yearObject = getKeyYear(year)

    if (yearObject == undefined) 
        return []
    
    else if (month in yearObject && day in yearObject[month])
        return yearObject[month][day]

    return []
}


export function markTaskCheckOfYearMonthAndDay(year: string, month: string, day: string, index: number, check: boolean) {
    const yearObject = getKeyYear(year)

    if (yearObject) {
        const monthObjects = yearObject[month]
        let arrayOfTasks = monthObjects[day]

        arrayOfTasks[index] = {
            ...arrayOfTasks[index],
            check
        }
        
        monthObjects[day] = arrayOfTasks
        yearObject[month] = monthObjects

        window.localStorage.setItem(year, JSON.stringify(yearObject))
        return arrayOfTasks
    }

    return null
}


function deleteFieldsYearObjectIfEmpty(yearObject: any, arrayOfTasks: any, monthObject: any, month: string, day: string) {
    if (arrayOfTasks.length != 0) {
        monthObject[day]  = arrayOfTasks
        yearObject[month] = monthObject

        return yearObject
    }

    delete monthObject[day]

    if (Object.keys(monthObject).length == 0)
        delete yearObject[month]

    return yearObject
}

function updateOrDeleteYearFromDatabase(yearObject: any, yearKey: string) {
    if (Object.keys(yearObject).length > 0)
        window.localStorage.setItem(yearKey, JSON.stringify(yearObject))

    else
        window.localStorage.removeItem(yearKey)
}

export function deleteTaskOfYearMonthAndDay(year: string, month: string, day: string, index: number) {
    let yearObject = getKeyYear(year)

    if (yearObject) {
        const monthObject = yearObject[month]
        let arrayOfTasks  = monthObject[day]

        arrayOfTasks.splice(index, 1)
        yearObject = deleteFieldsYearObjectIfEmpty(yearObject, arrayOfTasks, monthObject, month, day)
        updateOrDeleteYearFromDatabase(yearObject, year)

        return month in yearObject && day in yearObject[month] ? yearObject[month][day] : []
    }

    return null
}


export function getDaysWithTask(year: string, month: string) {
    const yearObject = getKeyYear(year)
    
    if (yearObject && month in yearObject)
        return Object.keys(yearObject[month])
    
    return []
}
