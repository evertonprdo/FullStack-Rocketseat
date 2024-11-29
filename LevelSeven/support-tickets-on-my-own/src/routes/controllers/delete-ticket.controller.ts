import type {
   HttpMethods,
   HttpRequest,
   HttpResponse,
} from '../../types/http.ts'
import type { Controller } from './controller.ts'

import { Validator } from '../../utils/validator.ts'

import { ResourceNotFoundError } from '../../core/use-cases/errors/resource-not-found.error.ts'

import { NotFoundException } from './exceptions/not-found.exception.ts'
import { BadRequestException } from './exceptions/bad-request.exception.ts'

import { DeleteTicketUseCase } from '../../core/use-cases/delete-ticket.use-case.ts'

type DeleteTicketParamsSchema = {
   id: string
}

export class DeleteTicketController implements Controller {
   deleteTicket: DeleteTicketUseCase

   method: HttpMethods = 'DELETE'
   path: string = '/tickets/:id'

   constructor(deleteTicket: DeleteTicketUseCase) {
      this.deleteTicket = deleteTicket
   }

   async handle(request: HttpRequest, response: HttpResponse) {
      const { id } = this.validateRequestParams(
         request.params as DeleteTicketParamsSchema,
      )

      const result = await this.deleteTicket.execute({ ticketId: id })

      if (result.isLeft()) {
         const error = result.value

         switch (error.constructor) {
            case ResourceNotFoundError:
               throw new NotFoundException(error.message)
            default:
               throw new BadRequestException(error.message)
         }
      }

      return response.writeHead(204).end()
   }

   private validateRequestParams(
      params?: DeleteTicketParamsSchema,
   ): DeleteTicketParamsSchema {
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
