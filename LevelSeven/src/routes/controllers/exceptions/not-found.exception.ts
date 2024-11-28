import type { ControllerException } from './controller.exception.ts'

export class NotFoundException extends Error implements ControllerException {
   statusCode: number

   constructor(message: string = 'Not Found') {
      super(message)
      this.statusCode = 404
   }
}
