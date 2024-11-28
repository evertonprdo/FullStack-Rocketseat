import { Either, right } from '../either.ts'

import { Ticket } from '../entities/ticket.ts'
import { TicketsRepository } from '../repositories/tickets.repository.ts'

interface FetchTicketsUseCaseRequest {
   status?: 'OPEN' | 'CLOSED'
}

type FetchTicketsUseCaseResponse = Either<null, { tickets: Ticket[] }>

export class FetchTicketsUseCase {
   constructor(private ticketsRepository: TicketsRepository) {}

   async execute({
      status,
   }: FetchTicketsUseCaseRequest): Promise<FetchTicketsUseCaseResponse> {
      const tickets = await this.ticketsRepository.findMany({ status })

      return right({ tickets })
   }
}
