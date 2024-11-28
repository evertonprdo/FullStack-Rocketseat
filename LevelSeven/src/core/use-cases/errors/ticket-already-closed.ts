import { UseCaseError } from './use-case.error.ts'

export class TicketAlreadyClosedError extends Error implements UseCaseError {
   constructor() {
      super('Ticket already closed')
   }
}
