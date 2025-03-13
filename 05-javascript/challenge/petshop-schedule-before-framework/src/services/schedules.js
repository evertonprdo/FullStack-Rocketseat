export class SchedulesService {
   #api
   #endpoint = 'schedules'

   constructor(apiService) {
      this.#api = apiService
   }

   async post({ authorName, petName, description, date }) {
      const body = JSON.stringify({
         id: String(new Date().getTime()),
         authorName,
         petName,
         description,
         date,
      })

      await this.#api.POST({ endpoint: this.#endpoint, body })
   }

   async get({ query }) {
      const schedules = await this.#api.GET({ endpoint: this.#endpoint })

      const querySchedules = schedules.filter((schedule) => {
         const date = schedule.date.split('T')[0]

         if (query === date) {
            return schedule
         }
      })

      return querySchedules
   }

   async delete(id) {
      await this.#api.DELETE({ endpoint: `${this.#endpoint}/${id}` })
   }
}
