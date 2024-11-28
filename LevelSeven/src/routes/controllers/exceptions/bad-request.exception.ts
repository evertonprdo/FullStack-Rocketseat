import type { ControllerException } from './controller.exception.ts'

export class BadRequestException extends Error implements ControllerException {
   statusCode: number

   constructor(message: string = 'Bad request') {
      super(message)
      this.statusCode = 400
   }
}
