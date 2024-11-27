import dayjs from 'dayjs'

export class FormModal {
   #modal
   #btnClose

   #form
   #inputs

   #onSubmitCallback

   get modal() {
      return this.#modal
   }

   constructor({ onSubmit, onClose }) {
      this.#modal = document.getElementById('bluer-bg-container')

      this.#form = document.querySelector('#form-container > form')
      this.#btnClose = document.getElementById('btn-close')

      this.#onSubmitCallback = onSubmit
      this.#form.addEventListener('submit', this.#onSubmit.bind(this))

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
      const iptDate = dayjs(event.target.valueAsDate)

      console.log(iptDate.format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'))

      if (iptDate.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
         return this.#inputs.time.setAttribute('min', dayjs().format('HH:mm'))
      }

      this.#inputs.time.setAttribute('min', '09:00')
   }

   #onSubmit(event) {
      event.preventDefault()

      // this.#onSubmitCallback(event)
   }
}
