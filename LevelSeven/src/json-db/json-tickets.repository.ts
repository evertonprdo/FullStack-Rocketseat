import { Ticket } from '../core/entities/ticket.ts'
import type { TicketsRepository } from '../core/repositories/tickets.repository.ts'

import { JsonDatabaseService } from './json-db.service.ts'
import {
   TicketMapper,
   type JsonDatabaseTicketSchema,
} from './tickets.mapper.ts'

export class JsonTicketsRepository implements TicketsRepository {
   private table = 'tickets'
   private db: JsonDatabaseService

   constructor(db: JsonDatabaseService) {
      this.db = db
   }

   async findById(id: string) {
      const table = this.db.select(this.table) as JsonDatabaseTicketSchema[]

      const ticket = table.find((item) => item.id === id)

      if (!ticket) {
         return null
      }

      return TicketMapper.toDomain(ticket)
   }

   async findMany({ status }: { status?: 'OPEN' | 'CLOSED' }) {
      const table = this.db.select(this.table) as JsonDatabaseTicketSchema[]

      const tickets = table.filter((item) => {
         if (status) {
            const rawStatus = status === 'OPEN' ? 1 : 0

            return item.status === rawStatus
         }

         return item
      })

      return tickets.map(TicketMapper.toDomain)
   }

   async create(ticket: Ticket) {
      this.db.insert(this.table, TicketMapper.toDatabase(ticket))
   }

   async save(ticket: Ticket) {
      this.db.update(this.table, TicketMapper.toDatabase(ticket))
   }

   async delete(ticket: Ticket) {
      this.db.remove(this.table, ticket.id.toString())
   }
}
