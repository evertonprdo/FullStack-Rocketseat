import { Entity } from './entity.ts'
import { UniqueEntityId } from './unique-entity-id.ts'

interface UserProps {
   name: string
}

export class User extends Entity<UserProps> {
   get name() {
      return this.props.name
   }

   set name(name) {
      this.props.name = name
   }

   static create(props: UserProps, id?: UniqueEntityId) {
      const user = new User(props, id)

      return user
   }
}
