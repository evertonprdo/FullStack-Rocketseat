import { type Either, right } from '../either.ts'

import { User } from '../entities/user.ts'
import { Ticket } from '../entities/ticket.ts'
import { Equipment } from '../entities/equipment.ts'

import type { TicketsRepository } from '../repositories/tickets.repository.ts'

interface CreateTicketUseCaseRequest {
   userName: string
   equipmentName: string
   description: string
}

type CreateTicketUseCaseResponse = Either<null, { ticket: Ticket }>

export class CreateTicketUseCase {
   private ticketsRepository: TicketsRepository

   constructor(ticketsRepository: TicketsRepository) {
      this.ticketsRepository = ticketsRepository
   }

   async execute({
      userName,
      description,
      equipmentName,
   }: CreateTicketUseCaseRequest): Promise<CreateTicketUseCaseResponse> {
      const user = User.create({ name: userName })
      const equipment = Equipment.create({ name: equipmentName })

      const ticket = Ticket.create({
         user,
         equipment,
         description,
      })

      await this.ticketsRepository.create(ticket)

      return right({ ticket })
   }
}
