import { Either, left, right } from '../either.ts'

import { Ticket } from '../entities/ticket.ts'
import { TicketsRepository } from '../repositories/tickets.repository.ts'

import { ResourceNotFoundError } from './errors/resource-not-found.error.ts'
import { TicketAlreadyClosedError } from './errors/ticket-already-closed.ts'

interface CloseTicketUseCaseRequest {
   ticketId: string
}

type CloseTicketUseCaseResponse = Either<
   ResourceNotFoundError | TicketAlreadyClosedError,
   { ticket: Ticket }
>

export class CloseTicketUseCase {
   constructor(private ticketsRepository: TicketsRepository) {}

   async execute({
      ticketId,
   }: CloseTicketUseCaseRequest): Promise<CloseTicketUseCaseResponse> {
      const ticket = await this.ticketsRepository.findById(ticketId)

      if (!ticket) {
         return left(new ResourceNotFoundError())
      }

      if (ticket.status === 'CLOSED') {
         return left(new TicketAlreadyClosedError())
      }

      ticket.close()

      await this.ticketsRepository.save(ticket)

      return right({ ticket })
   }
}
