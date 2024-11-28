import { type Either, right } from '../either.ts'

import { Ticket, type TicketStatus } from '../entities/ticket.ts'
import type { TicketsRepository } from '../repositories/tickets.repository.ts'

interface FetchTicketsUseCaseRequest {
   status?: TicketStatus
}

type FetchTicketsUseCaseResponse = Either<null, { tickets: Ticket[] }>

export class FetchTicketsUseCase {
   private ticketsRepository: TicketsRepository

   constructor(ticketsRepository: TicketsRepository) {
      this.ticketsRepository = ticketsRepository
   }

   async execute({
      status,
   }: FetchTicketsUseCaseRequest): Promise<FetchTicketsUseCaseResponse> {
      const tickets = await this.ticketsRepository.findMany({ status })

      return right({ tickets })
   }
}
