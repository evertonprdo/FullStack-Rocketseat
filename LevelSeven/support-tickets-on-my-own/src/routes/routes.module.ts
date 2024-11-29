import type { HttpRequest, HttpResponse } from '../types/http.ts'
import { JsonDatabaseModule } from '../json-db/json-db.module.ts'

import type { Controller } from './controllers/controller.ts'

import { CreateTicketUseCase } from '../core/use-cases/create-ticket.use-case.ts'
import { PostTicketController } from './controllers/post-ticket.controller.ts'

import { FetchTicketsUseCase } from '../core/use-cases/fetch-tickets.use-case.ts'
import { GetTicketsController } from './controllers/get-tickets.controller.ts'

import { PutTicketController } from './controllers/put.controller.ts'
import { UpdateTicketsUseCase } from '../core/use-cases/update-ticket.use-case.ts'

import { CloseTicketUseCase } from '../core/use-cases/close-ticket.use-case.ts'
import { CloseTicketController } from './controllers/close-ticket.controller.ts'

import { DeleteTicketUseCase } from '../core/use-cases/delete-ticket.use-case.ts'
import { DeleteTicketController } from './controllers/delete-ticket.controller.ts'

type MatchGroups<T extends string> = RegExpMatchArray & {
   groups: Record<T, string>
}
type RouteMatch = MatchGroups<'query' | string>

type Route = Omit<Controller, 'path'> & { path: RegExp }

export class RouteModule {
   private routes: Route[]
   private database: JsonDatabaseModule

   constructor(database: JsonDatabaseModule) {
      this.database = database

      const getTicketsController = new GetTicketsController(
         new FetchTicketsUseCase(this.database.ticketsRepository),
      )

      const postTicketController = new PostTicketController(
         new CreateTicketUseCase(this.database.ticketsRepository),
      )

      const putTicketController = new PutTicketController(
         new UpdateTicketsUseCase(this.database.ticketsRepository),
      )

      const closeTicketController = new CloseTicketController(
         new CloseTicketUseCase(this.database.ticketsRepository),
      )

      const deleteTicketController = new DeleteTicketController(
         new DeleteTicketUseCase(this.database.ticketsRepository),
      )

      this.routes = [
         postTicketController,
         getTicketsController,
         putTicketController,
         closeTicketController,
         deleteTicketController,
      ].map((route) => ({
         ...route,
         method: route.method,
         path: this.parseRoutePath(route.path),
         handle: route.handle.bind(route),
      }))
   }

   async handler(request: HttpRequest, response: HttpResponse) {
      const route = this.routes.find((route) => {
         return (
            route.method === request.method &&
            route.path.test(request.url || '')
         )
      })

      try {
         if (route) {
            const routeParams = request.url?.match(route.path) as RouteMatch

            if (routeParams) {
               const { query, ...params } = routeParams.groups

               request.params = params
               request.query = query ? this.extractQueryParams(query) : {}
            }

            return await route.handle(request, response)
         }
      } catch (error) {
         if (error.statusCode) {
            return response.writeHead(error.statusCode).end(error.message)
         }

         return response
            .writeHead(501)
            .end(`Internal Server Error: ${JSON.stringify(error.message)}`)
      }

      return response.writeHead(404).end(`Not Found`)
   }

   parseRoutePath(path: string): RegExp {
      const routeParametersRegex = /:([a-zA-Z]+)/g

      const params = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9-_]+)')

      const pathRegex = new RegExp(`${params}(?<query>\\?(.*))?$`)

      return pathRegex
   }

   extractQueryParams(query: string): Record<string, string> {
      return query
         .slice(1)
         .split('&')
         .reduce((queryParams, param) => {
            const [key, value] = param.split('=')

            queryParams[key] = value
            return queryParams
         }, {})
   }
}
