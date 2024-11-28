import { Either, left, right } from '../either.ts'

import { TicketsRepository } from '../repositories/tickets.repository.ts'
import { ResourceNotFoundError } from './errors/resource-not-found.error.ts'

interface DeleteTicketUseCaseRequest {
   ticketId: string
}

type DeleteTicketUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteTicketUseCase {
   constructor(private ticketsRepository: TicketsRepository) {}

   async execute({
      ticketId,
   }: DeleteTicketUseCaseRequest): Promise<DeleteTicketUseCaseResponse> {
      const ticket = await this.ticketsRepository.findById(ticketId)

      if (!ticket) {
         return left(new ResourceNotFoundError())
      }

      await this.ticketsRepository.delete(ticket)

      return right(null)
   }
}
