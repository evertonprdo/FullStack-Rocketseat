export function remove({ request, response, database }) {
   const { id } = request.params

   database.delete('tickets', id)

   return response.writeHead(204).end()
}
