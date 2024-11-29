import type { ControllerException } from './controller.exception.ts'

export class ForbiddenException extends Error implements ControllerException {
   statusCode: number

   constructor(message: string = 'Forbidden') {
      super(message)
      this.statusCode = 403
   }
}
