import type {
   HttpMethods,
   HttpRequest,
   HttpResponse,
} from '../../types/http.ts'
import type { Controller } from './controller.ts'

import { Validator } from '../../utils/validator.ts'

import { NotAllowedError } from '../../core/use-cases/errors/not-allowed.error.ts'
import { ResourceNotFoundError } from '../../core/use-cases/errors/resource-not-found.error.ts'

import { NotFoundException } from './exceptions/not-found.exception.ts'
import { ForbiddenException } from './exceptions/forbidden.exception.ts'
import { BadRequestException } from './exceptions/bad-request.exception.ts'

import { UpdateTicketsUseCase } from '../../core/use-cases/update-ticket.use-case.ts'

type PutTicketBodySchema = {
   user_name: string
   description: string
   equipment_name: string
}

type PutTicketParamsSchema = {
   id: string
}

export class PutTicketController implements Controller {
   private updateTicket: UpdateTicketsUseCase

   method: HttpMethods = 'PUT'
   path: string = '/tickets/:id'

   constructor(updateTicket: UpdateTicketsUseCase) {
      this.updateTicket = updateTicket
   }

   async handle(
      request: HttpRequest,
      response: HttpResponse,
   ): Promise<HttpResponse> {
      const { user_name, equipment_name, description } =
         this.validateRequestBody(request.body)

      const { id } = this.validateRequestParams(
         request.params as PutTicketParamsSchema | undefined,
      )

      const result = await this.updateTicket.execute({
         ticketId: id,
         userName: user_name,
         description: description,
         equipmentName: equipment_name,
      })

      if (result.isLeft()) {
         const error = result.value

         switch (error.constructor) {
            case ResourceNotFoundError:
               throw new NotFoundException(error.message)
            case NotAllowedError:
               throw new ForbiddenException(error.message)
            default:
               throw new BadRequestException(error.message)
         }
      }

      return response.writeHead(201).end()
   }

   private validateRequestParams(
      params?: PutTicketParamsSchema,
   ): PutTicketParamsSchema {
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

   private validateRequestBody(
      body?: Partial<PutTicketBodySchema> | null,
   ): PutTicketBodySchema {
      if (!body || typeof body !== 'object' || body === null) {
         throw new BadRequestException()
      }

      const bodyKeyValue = [
         { key: 'user_name', value: body.user_name, rule: 3 },
         { key: 'description', value: body.description, rule: 5 },
         { key: 'equipment_name', value: body.equipment_name, rule: 3 },
      ]

      for (const { key, value, rule } of bodyKeyValue) {
         if (!Validator.isValidString(value)) {
            throw new BadRequestException(`Missing body param '${key}'`)
         }

         if (!Validator.minLength(value as string, rule)) {
            throw new BadRequestException(
               `Invalid body parm "${key}"\nvalue: ${value}\nrule: min length "${rule}"`,
            )
         }
      }

      return body as PutTicketBodySchema
   }
}
