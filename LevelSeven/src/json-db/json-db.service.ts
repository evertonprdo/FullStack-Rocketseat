import fs from 'node:fs/promises'

type DatabaseItems = { id: string }
type DatabaseTableSchema = Record<string, DatabaseItems[]>

const DATABASE_PATH = new URL('db.json', import.meta.url)

export class JsonDatabaseService {
   #database: DatabaseTableSchema = {}

   constructor() {
      fs.readFile(DATABASE_PATH, 'utf-8')
         .then((data) => {
            this.#database = JSON.parse(data)
         })
         .catch(() => {
            this.#persist()
         })
   }

   #persist() {
      fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
   }

   remove(table: string, id: string) {
      if (!Array.isArray(this.#database[table])) {
         throw new Error("table doesn't exists")
      }

      const itemIndex = this.#database[table].findIndex(
         (item) => item.id === id,
      )

      this.#database[table].splice(itemIndex, 1)
   }

   update<T extends DatabaseItems>(table: string, data: T) {
      if (!Array.isArray(this.#database[table])) {
         throw new Error("table doesn't exists")
      }

      const itemIndex = this.#database[table].findIndex(
         (item) => item.id === data.id,
      )

      this.#database[table][itemIndex] = data
   }

   insert<T extends DatabaseItems>(table: string, data: T) {
      if (Array.isArray(this.#database[table])) {
         this.#database[table].push(data)
      } else {
         this.#database[table] = [data]
      }

      this.#persist()
   }

   select(table: string) {
      return this.#database[table] ?? []
   }
}
