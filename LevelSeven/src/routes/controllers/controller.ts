import type {
   HttpMethods,
   HttpRequest,
   HttpResponse,
} from '../../types/http.ts'

export interface Controller {
   method: HttpMethods
   path: string

   handle(request: HttpRequest, response: HttpResponse): Promise<HttpResponse>
}
