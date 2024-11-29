import type {
   HttpMethods,
   HttpRequest,
   HttpResponse,
} from '../../types/http.ts'
import type { Controller } from './controller.ts'

import { Validator } from '../../utils/validator.ts'

import { ResourceNotFoundError } from '../../core/use-cases/errors/resource-not-found.error.ts'
import { TicketAlreadyClosedError } from '../../core/use-cases/errors/ticket-already-closed.error.ts'

import { NotFoundException } from './exceptions/not-found.exception.ts'
import { BadRequestException } from './exceptions/bad-request.exception.ts'

import { CloseTicketUseCase } from '../../core/use-cases/close-ticket.use-case.ts'

type CloseTicketParamsSchema = {
   id: string
}

export class CloseTicketController implements Controller {
   closeTicket: CloseTicketUseCase

   method: HttpMethods = 'PATCH'
   path: string = '/tickets/:id/close'

   constructor(closeTicket: CloseTicketUseCase) {
      this.closeTicket = closeTicket
   }

   async handle(request: HttpRequest, response: HttpResponse) {
      const { id } = this.validateRequestParams(
         request.params as CloseTicketParamsSchema,
      )

      const result = await this.closeTicket.execute({ ticketId: id })

      if (result.isLeft()) {
         const error = result.value

         switch (error.constructor) {
            case ResourceNotFoundError:
               throw new NotFoundException(error.message)
            case TicketAlreadyClosedError:
               throw new BadRequestException(error.message)
            default:
               throw new BadRequestException(error.message)
         }
      }

      return response.writeHead(204).end()
   }

   private validateRequestParams(
      params?: CloseTicketParamsSchema,
   ): CloseTicketParamsSchema {
      if (!params || typeof params !== 'object' || params === null) {
         throw new BadRequestException()
      }

      if (!params.id) {
         throw new BadRequestException('Missing param "id"')
      }

      if (!Validator.isValidString(params.id)) {
         throw new BadRequestException('Missing param "id"')
      }

      return params
   }
}
