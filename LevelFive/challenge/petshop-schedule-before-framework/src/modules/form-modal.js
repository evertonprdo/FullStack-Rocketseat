import dayjs from 'dayjs'

export class FormModal {
   #modal
   #btnClose

   #form
   #inputs

   get modal() {
      return this.#modal
   }

   constructor({ onSubmit, onClose }) {
      this.#modal = document.getElementById('bluer-bg-container')

      this.#form = document.querySelector('#form-container > form')
      this.#btnClose = document.getElementById('btn-close')

      this.#form.addEventListener('submit', (event) =>
         this.#onSubmit(event, onSubmit),
      )

      this.#btnClose.addEventListener('click', onClose)

      this.#inputs = {
         authorName: this.#form.querySelector('#author-name'),
         petName: this.#form.querySelector('#pet-name'),
         description: this.#form.querySelector('#description'),
         date: this.#form.querySelector('#form-date'),
         time: this.#form.querySelector('#form-time'),
      }

      this.#setup()
   }

   #setup() {
      const dayjsDate = dayjs()

      this.#inputs.date.setAttribute('min', dayjsDate.format('YYYY-MM-DD'))
      this.#inputs.date.addEventListener(
         'change',
         this.#onIptDateChange.bind(this),
      )

      this.reset()
   }

   reset() {
      const dayjsDate = dayjs()

      this.#inputs.authorName.value = ''
      this.#inputs.petName.value = ''
      this.#inputs.description.value = ''

      this.#inputs.time.value = dayjsDate.format('HH:mm')
      this.#inputs.time.setAttribute('min', dayjsDate.format('HH:mm'))
      this.#inputs.date.value = dayjsDate.format('YYYY-MM-DD')
   }

   #onIptDateChange(event) {
      const iptDate = dayjs(event.target.value)

      if (iptDate.isSame(new Date(), 'dates')) {
         return this.#inputs.time.setAttribute('min', dayjs().format('HH:mm'))
      }

      this.#inputs.time.setAttribute('min', '09:00')
   }

   #onSubmit(event, callback) {
      event.preventDefault()

      const authorName = this.#inputs.authorName.value.trim()
      const petName = this.#inputs.petName.value.trim()
      const description = this.#inputs.description.value.trim()

      const date = this.#inputs.date.valueAsDate.toISOString().split('T')[0]
      const time = this.#inputs.time.valueAsDate.toISOString().split('T')[1]

      callback({
         authorName,
         petName,
         description,
         date,
         time,
      })
   }
}
