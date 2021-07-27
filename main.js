const today = new Date().toDateString()
const twoDays = 2 * 24 * 60 * 60 * 1000
const oneDay = twoDays / 2
const calendar = document.querySelector(".dates")

let currentDate = new Date()

class Calendar {
    constructor(currentDate) {
        this.currentDate = currentDate
        this.start = currentDate - twoDays
        this.datesDisplayed = []

        while (calendar.firstChild) {
            calendar.removeChild(calendar.firstChild);
        }
        
        for(let index = 0; index < 5; index++) {
            let render = false

            if(index === 2)
                render = true 

            if(this.datesDisplayed.length === 0) {
                this.datesDisplayed.push( new Date(this.start) )

                continue
            }
            
            this.datesDisplayed.push( new Date( Number( this.datesDisplayed[this.datesDisplayed.length - 1] ) + oneDay ) )
        }

        for(let index = 0; index < 5; index++) {
            const date = this.datesDisplayed[index]
            const splitted = new Date(date).toDateString().split(' ')
            splitted.pop()
            splitted.shift()
            const formatted = splitted.join(' ')
            let render = false
            
            if(new Date().toDateString() == date.toDateString())
                render = true

            renderDates(formatted, render)
        }
    }
}

let calendarWidget = new Calendar(currentDate)

function next() {
    calendarWidget = new Calendar( new Date( Number(calendarWidget.currentDate) - oneDay * 5 ) )
}

function prev() {
    calendarWidget = new Calendar( new Date( Number(calendarWidget.currentDate) + oneDay * 5 ) )
}

function renderDates(date, selected) {
    const days = document.getElementById("days")
    const clone = days.content.cloneNode(true)
    const data = clone.querySelector("p")

    data.innerText = String(date)

    if(selected)
        data.className = "selected"

    calendar.appendChild(clone)
}