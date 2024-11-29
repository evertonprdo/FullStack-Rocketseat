import type { HttpRequest, HttpResponse } from '../types/http.ts'

export async function jsonBodyHandler(
   request: HttpRequest,
   response: HttpResponse,
) {
   const buffers: Buffer[] = []

   for await (const chunk of request) {
      buffers.push(chunk)
   }

   try {
      request.body = JSON.parse(Buffer.concat(buffers).toString())
   } catch (error) {
      request.body = null
   }

   response.setHeader('Content-Type', 'application/json')
}
