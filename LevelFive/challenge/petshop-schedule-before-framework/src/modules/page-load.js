import dayjs from 'dayjs'

import { FormModal } from './form/modal'
import { SchedulesPage } from './schedules/page'
import { ApiService } from '../services/apiService'
import { SchedulesService } from '../services/schedules'
import { SchedulePresenter } from '../services/presenter/schedule'

export class PageLoader {
   #schedulesService
   #schedulesPage
   #formModal

   constructor({ SchedulesPage, FormModal, schedulesService }) {
      this.#schedulesService = schedulesService

      const today = new Date()

      document.addEventListener('DOMContentLoaded', () => {
         this.#schedulesPage = new SchedulesPage({
            queryDate: dayjs(today).format('YYYY-MM-DD'),
            btnOnClick: this.openForm.bind(this),
            iptDateOnChange: this.#onDateChange.bind(this),
            onRemoveItem: this.#onRemoveSchedule.bind(this),
         })

         this.#formModal = new FormModal({
            onSubmit: this.#onNewSchedule.bind(this),
            onClose: this.#toggleModal.bind(this),
         })

         this.#fetchSchedules(today.toISOString().split('T')[0])
      })
   }

   async #fetchSchedules(query) {
      try {
         const schedules = await this.#schedulesService.get({ query })

         const schedulesBySection = {
            morning: [],
            afternoon: [],
            night: [],
         }

         for (const schedule of schedules) {
            const currentDate = dayjs(schedule.date)

            const itemListProps = SchedulePresenter.toScheduleItemList(schedule)

            if (currentDate.hour() < 12) {
               schedulesBySection.morning.push(itemListProps)
               continue
            }

            if (currentDate.hour() >= 12 && currentDate.hour() <= 17) {
               schedulesBySection.afternoon.push(itemListProps)
               continue
            }

            schedulesBySection.night.push(itemListProps)
         }

         this.#schedulesPage.renderSchedules(schedulesBySection)
      } catch (error) {
         alert(error)
      }
   }

   openForm() {
      this.#toggleModal()
      this.#formModal.reset()
   }

   #toggleModal() {
      this.#formModal.modal.classList.toggle('hidden')
   }

   async #onDateChange(date) {
      this.#schedulesPage.date = dayjs(date).format('YYYY-MM-DD')

      this.#fetchSchedules(date)
   }

   async #onRemoveSchedule(id) {
      const confirmed = confirm(
         'Are you sure you want to delete this schedule?',
      )

      if (confirmed) {
         try {
            await this.#schedulesService.delete(id)
         } catch (error) {
            alert(error)
         } finally {
            this.#fetchSchedules(this.#schedulesPage.queryDate)
         }
      }
   }

   #onNewSchedule(event) {
      event.preventDefault()
   }
}

const apiService = new ApiService({ baseUrl: 'http://localhost:3333' })
const schedulesService = new SchedulesService(apiService)

const pageLoader = new PageLoader({
   SchedulesPage,
   FormModal,
   schedulesService,
})
