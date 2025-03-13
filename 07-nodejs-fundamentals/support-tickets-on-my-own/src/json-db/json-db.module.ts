import { JsonDatabaseService } from './json-db.service.ts'
import { JsonTicketsRepository } from './json-tickets.repository.ts'

export class JsonDatabaseModule {
   private _ticketsRepository: JsonTicketsRepository
   private databaseService: JsonDatabaseService

   get ticketsRepository() {
      return this._ticketsRepository
   }

   constructor() {
      this.databaseService = new JsonDatabaseService()
      this._ticketsRepository = new JsonTicketsRepository(this.databaseService)
   }
}
