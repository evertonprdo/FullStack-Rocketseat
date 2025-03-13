import type {
   HttpMethods,
   HttpRequest,
   HttpResponse,
} from '../../types/http.ts'
import type { Controller } from './controller.ts'

import { Validator } from '../../utils/validator.ts'
import { BadRequestException } from './exceptions/bad-request.exception.ts'

import { CreateTicketUseCase } from '../../core/use-cases/create-ticket.use-case.ts'

type PostTicketBodySchema = {
   user_name: string
   description: string
   equipment_name: string
}

export class PostTicketController implements Controller {
   private createTicket: CreateTicketUseCase

   method: HttpMethods = 'POST'
   path: string = '/tickets'

   constructor(createTicket: CreateTicketUseCase) {
      this.createTicket = createTicket
   }

   async handle(
      request: HttpRequest,
      response: HttpResponse,
   ): Promise<HttpResponse> {
      const { user_name, equipment_name, description } =
         this.validateRequestBody(request.body)

      const result = await this.createTicket.execute({
         userName: user_name,
         description: description,
         equipmentName: equipment_name,
      })

      if (result.isLeft()) {
         throw new BadRequestException()
      }

      return response.writeHead(201).end()
   }

   private validateRequestBody(
      body?: Partial<PostTicketBodySchema> | null,
   ): PostTicketBodySchema {
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

      return body as PostTicketBodySchema
   }
}
