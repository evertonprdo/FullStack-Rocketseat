export class ApiService {
   #baseUrl

   get baseUrl() {
      return this.#baseUrl
   }

   constructor({ baseUrl }) {
      this.#baseUrl = baseUrl
   }

   async #request({ endpoint, method, body }) {
      const response = await fetch(`${this.#baseUrl}/${endpoint}`, {
         method,
         'Content-type': 'application/json',
         body,
      })

      if (!response.ok) {
         throw new Error(
            `Request failed with status code: ${response.status} ${response.statusText}`,
         )
      }

      const data = await response.json()

      return data
   }

   async GET({ endpoint }) {
      return this.#request({ endpoint, method: 'GET' })
   }

   async POST({ endpoint, body }) {
      return this.#request({ endpoint, method: 'POST', body })
   }

   async DELETE({ endpoint }) {
      return this.#request({ endpoint, method: 'DELETE' })
   }
}
