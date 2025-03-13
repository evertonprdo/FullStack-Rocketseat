import { Ticket } from '../../core/entities/ticket.ts'

export class TicketPresenter {
   static toHTTP(ticket: Ticket) {
      return {
         id: ticket.id.toString(),
         status: ticket.status,
         description: ticket.description,
         equipment_name: ticket.equipment.name,
         user_name: ticket.user.name,
         created_at: ticket.createdAt.toISOString(),
         updated_at: ticket.updatedAt ? ticket.updatedAt.toISOString() : null,
      }
   }
}
