import { 
    getCurrentMonthNumber,
    getCurrentYear,
    getNumberMonthWithName,
    getIndexNextMonth,
    getCurrentCalender,
    getMaxDayOldMonth,
    generateWeeksOfMonth,
    getNameMonth
} from './dateUtils'



describe('suites tests from dateUtils.ts', () => {
    test('Test get current month name', () => {
        expect(getCurrentMonthNumber()).toBe(2)
    })

    
    test('Test get current year number', () => {
        expect(getCurrentYear()).toBe(2022)
    })


    test('Test get month name', () => {
        expect(getNameMonth(2)).toBe('MARÇO')
    })

    test('Test current calender', () => {
        const resultCalenderData = getCurrentCalender(2022, 2)

        const calenderWithFirstWeek = {
            ...resultCalenderData,
            week: resultCalenderData.week[0]
        }

        expect(calenderWithFirstWeek).toEqual({
            currentMonth: 'MARÇO', 
            currentYear: 2022,
            week: [
                { dayNumber: 27, applyGrayColor: true  },
                { dayNumber: 28, applyGrayColor: true  },
                { dayNumber: 1,  applyGrayColor: false },
                { dayNumber: 2,  applyGrayColor: false },
                { dayNumber: 3,  applyGrayColor: false },
                { dayNumber: 4,  applyGrayColor: false },
                { dayNumber: 5,  applyGrayColor: false },
            ]
        })
    })


    test('Test get month number with name month', () => {
        const marchNumber = getNumberMonthWithName('MARÇO')
        expect(marchNumber).toBe(2)
    })


    test('Test later month March', () => {
        const marchNumber = getNumberMonthWithName('MARÇO')
        const laterMonth  = getIndexNextMonth(marchNumber, 2022, 1) // 3 -> ABRIL

        expect(laterMonth).toEqual({ nextMonthNumber: 3, newYear: 2022 })
    })


    test('Test later month December', () => {
        const decemberNumber = getNumberMonthWithName('DEZEMBRO')
        const laterMonth = getIndexNextMonth(decemberNumber, 2022, 1) // 0 -> JANEIRO

        expect(laterMonth).toEqual({ nextMonthNumber: 0, newYear: 2023 })
    })

    test('Test old max days old month', () => {
        const oldMaxDayMonth = getMaxDayOldMonth(2, 2022) // 2-> MARÇO
        expect(oldMaxDayMonth).toBe(28) // FEVEREIRO 28 dias
    })

    test('Test generate first week', () => {
        const firstWeek = generateWeeksOfMonth({ 
            currentMonthMaxDay: 31, 
            firstMonthWeekStartInDay: 26, 
            oldMonthMaxDay: 28,
            indexWeekDayFirstDayMonth: 2
        })[0]

        expect(firstWeek).toEqual([
            { dayNumber: 27, applyGrayColor: true  },
            { dayNumber: 28, applyGrayColor: true  },
            { dayNumber: 1,  applyGrayColor: false },
            { dayNumber: 2,  applyGrayColor: false },
            { dayNumber: 3,  applyGrayColor: false },
            { dayNumber: 4,  applyGrayColor: false },
            { dayNumber: 5,  applyGrayColor: false },
        ])
    })

    test('Test generate last week', () =>  {
        let lastWeek = generateWeeksOfMonth({ 
            currentMonthMaxDay: 31, 
            firstMonthWeekStartInDay: 26, 
            oldMonthMaxDay: 28,
            indexWeekDayFirstDayMonth: 2
        })[5]

        expect(lastWeek).toEqual([
            { dayNumber: 3, applyGrayColor: true  },
            { dayNumber: 4, applyGrayColor: true  },
            { dayNumber: 5, applyGrayColor: true  },
            { dayNumber: 6, applyGrayColor: true  },
            { dayNumber: 7, applyGrayColor: true  },
            { dayNumber: 8, applyGrayColor: true  },
            { dayNumber: 9, applyGrayColor: true  },
        ])
    })
})
