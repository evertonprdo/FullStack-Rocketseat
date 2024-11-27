import dayjs from 'dayjs'

export class SchedulesPage {
   #queryDate

   #iptDate
   #schedulesList
   #btnNewSchedule

   get queryDate() {
      return this.#queryDate
   }

   set queryDate(date) {
      this.#queryDate = date
      this.#iptDate.value = date
   }

   constructor({ btnOnClick, iptDateOnChange, onRemoveItem }) {
      this.#schedulesList = {
         morning: document.querySelector('#morning-list > ul'),
         afternoon: document.querySelector('#afternoon-list > ul'),
         night: document.querySelector('#night-list > ul'),
      }

      this.#iptDate = document.getElementById('ipt-date')
      this.#btnNewSchedule = document.getElementById('btn-new-schedule')

      this.#btnNewSchedule.addEventListener('click', btnOnClick)

      this.#iptDate.addEventListener('change', (event) =>
         this.#onChangeIptDate(event, iptDateOnChange),
      )

      const today = dayjs().format('YYYY-MM-DD')

      this.queryDate = today
      this.#iptDate.setAttribute('min', dayjs(today).format('YYYY-MM-DD'))

      const main = document.querySelector('main')
      main.addEventListener('click', (event) =>
         this.#onClickRemoveSchedule(event, onRemoveItem),
      )
   }

   #onChangeIptDate(event, callback) {
      const date = event.target.valueAsDate.toISOString().split('T')[0]

      this.queryDate = date
      callback(date)
   }

   #onClickRemoveSchedule(event, callback) {
      const target = event.target

      if (target.classList.contains('btn-remove')) {
         const scheduleId = target.closest('li').dataset.scheduleId

         callback(String(scheduleId))
      }
   }

   renderSchedules(schedules) {
      for (const section of Object.values(this.#schedulesList)) {
         section.innerHTML = ''
      }

      for (const key in schedules) {
         let itemList = []

         schedules[key].forEach((scheduleData) => {
            itemList.push(this.#createItem(scheduleData))
         })

         this.#schedulesList[key].append(...itemList)
      }
   }

   #createItem({ id, time, petName, authorName, description }) {
      const li = document.createElement('li')
      li.setAttribute('data-schedule-id', id)
      li.setAttribute('role', 'list')

      const spanTime = document.createElement('span')
      const spanNames = document.createElement('span')
      const spanDescription = document.createElement('span')
      const btnRemove = document.createElement('button')

      spanTime.innerText = time
      spanNames.innerHTML = `${petName}<small>/ ${authorName}</small>`
      spanDescription.innerText = description

      btnRemove.innerText = 'Remove schedule'
      btnRemove.classList.add('btn-remove')

      li.append(spanTime, spanNames, spanDescription, btnRemove)
      return li
   }
}
