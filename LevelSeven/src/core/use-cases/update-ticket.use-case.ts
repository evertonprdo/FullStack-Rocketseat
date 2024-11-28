import { type Either, left, right } from '../either.ts'

import { Ticket } from '../entities/ticket.ts'
import { Equipment } from '../entities/equipment.ts'
import type { TicketsRepository } from '../repositories/tickets.repository.ts'

import { NotAllowedError } from './errors/not-allowed.error.ts'
import { ResourceNotFoundError } from './errors/resource-not-found.error.ts'

interface UpdateTicketsUseCaseRequest {
   ticketId: string
   userName: string
   description: string
   equipmentName: string
}

type UpdateTicketsUseCaseResponse = Either<
   ResourceNotFoundError | NotAllowedError,
   { ticket: Ticket }
>

export class UpdateTicketsUseCase {
   private ticketsRepository: TicketsRepository

   constructor(ticketsRepository: TicketsRepository) {
      this.ticketsRepository = ticketsRepository
   }

   async execute({
      ticketId,
      userName,
      description,
      equipmentName,
   }: UpdateTicketsUseCaseRequest): Promise<UpdateTicketsUseCaseResponse> {
      const ticket = await this.ticketsRepository.findById(ticketId)

      if (!ticket) {
         return left(new ResourceNotFoundError())
      }

      if (ticket.user.name !== userName) {
         return left(new NotAllowedError())
      }

      const equipment = Equipment.create({ name: equipmentName })

      ticket.equipment = equipment
      ticket.description = description

      await this.ticketsRepository.save(ticket)

      return right({ ticket })
   }
}
