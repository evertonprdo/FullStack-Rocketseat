import { Optional } from '../types/optional.ts'

import { Entity } from './entity.ts'
import { UniqueEntityId } from './unique-entity-id.ts'

import { User } from './user.ts'
import { Equipment } from './equipment.ts'

interface TicketProps {
   status: 'OPEN' | 'CLOSED'
   description: string

   user: User
   equipment: Equipment

   createdAt: Date
   updatedAt?: Date | null
}

export class Ticket extends Entity<TicketProps> {
   get status() {
      return this.props.status
   }

   get description() {
      return this.props.description
   }

   set description(description) {
      this.props.description = description
      this.touch()
   }

   get user() {
      return this.props.user
   }

   get equipment() {
      return this.props.equipment
   }

   set equipment(equipment) {
      this.props.equipment = equipment
      this.touch()
   }

   get createdAt() {
      return this.props.createdAt
   }

   get updatedAt() {
      return this.props.updatedAt
   }

   touch() {
      this.props.updatedAt = new Date()
   }

   close() {
      this.props.status = 'CLOSED'
   }

   static create(
      props: Optional<TicketProps, 'createdAt' | 'updatedAt' | 'status'>,
      id?: UniqueEntityId,
   ) {
      const ticket = new Ticket(
         {
            ...props,
            status: props.status ?? 'OPEN',
            createdAt: props.createdAt ?? new Date(),
         },
         id,
      )

      return ticket
   }
}
