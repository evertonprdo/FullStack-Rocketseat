export class Validator {
   static isValidString(string: string | undefined | null) {
      return string && typeof string === 'string' && string.trim().length > 0
   }

   static minLength(string: string, minLength: number) {
      return string.trim().length >= minLength
   }
}
