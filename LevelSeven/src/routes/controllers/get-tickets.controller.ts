import type {
   HttpMethods,
   HttpRequest,
   HttpResponse,
} from '../../types/http.ts'
import type { TicketStatus } from '../../core/entities/ticket.ts'
import type { Controller } from './controller.ts'

import { BadRequestException } from './exceptions/bad-request.exception.ts'

import { TicketPresenter } from '../presenter/ticket.presenter.ts'
import { FetchTicketsUseCase } from '../../core/use-cases/fetch-tickets.use-case.ts'

type GetTicketsQuerySchema = {
   status?: TicketStatus
}

export class GetTicketsController implements Controller {
   getTickets: FetchTicketsUseCase

   method: HttpMethods = 'GET'
   path: string = '/tickets'

   constructor(getTickets: FetchTicketsUseCase) {
      this.getTickets = getTickets
   }

   async handle(request: HttpRequest, response: HttpResponse) {
      const query = this.validateRequestQueryParams(request.query)
      const result = await this.getTickets.execute(query)

      if (result.isLeft()) {
         throw new BadRequestException()
      }

      const tickets = result.value.tickets.map(TicketPresenter.toHTTP)

      return response.end(JSON.stringify({ tickets }))
   }

   validateRequestQueryParams(params?: GetTicketsQuerySchema) {
      if (!params || !params.status) {
         return {}
      }

      if (params.status === 'OPEN' || params.status === 'CLOSED') {
         return params
      }

      throw new BadRequestException(
         `Invalid query params: ${JSON.stringify(params)}`,
      )
   }
}
