import { Ticket } from '../entities/ticket.ts'

export interface TicketsRepository {
   findById(id: string): Promise<Ticket | null>
   findMany(params: { status?: 'OPEN' | 'CLOSED' }): Promise<Ticket[]>

   create(ticket: Ticket): Promise<void>
   save(ticket: Ticket): Promise<void>
   delete(ticket: Ticket): Promise<void>
}
