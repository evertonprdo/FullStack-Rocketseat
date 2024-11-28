import http from 'node:http'

export type HttpRequest = http.IncomingMessage & {
   body?: Record<string, any> | null
   query?: Record<string, string>
   params?: Record<string, string>
}
export type HttpResponse = http.ServerResponse<http.IncomingMessage> & {
   req: http.IncomingMessage
}

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
