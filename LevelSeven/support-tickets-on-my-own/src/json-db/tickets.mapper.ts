import { UniqueEntityId } from '../core/entities/unique-entity-id.ts'

import { User } from '../core/entities/user.ts'
import { Equipment } from '../core/entities/equipment.ts'

import { Ticket } from '../core/entities/ticket.ts'

export interface JsonDatabaseTicketSchema {
   id: string
   status: 0 | 1
   description: string

   equipment_name: string
   user_name: string

   created_at: string
   updated_at: string
}

export class TicketMapper {
   static toDomain(raw: JsonDatabaseTicketSchema): Ticket {
      const user = User.create({ name: raw.user_name })
      const equipment = Equipment.create({ name: raw.equipment_name })

      return Ticket.create(
         {
            status: raw.status ? 'OPEN' : 'CLOSED',
            description: raw.description,
            user,
            equipment,
            createdAt: new Date(raw.created_at),
            updatedAt: new Date(raw.updated_at),
         },
         new UniqueEntityId(raw.id),
      )
   }

   static toDatabase(ticket: Ticket): JsonDatabaseTicketSchema {
      return {
         id: ticket.id.toString(),
         description: ticket.description,
         status: ticket.status === 'OPEN' ? 1 : 0,
         user_name: ticket.user.name,
         equipment_name: ticket.equipment.name,
         created_at: ticket.createdAt.toISOString(),
         updated_at: !ticket.updatedAt
            ? ticket.createdAt.toISOString()
            : ticket.updatedAt.toISOString(),
      }
   }
}
