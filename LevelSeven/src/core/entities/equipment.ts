import { Entity } from './entity.ts'
import { UniqueEntityId } from './unique-entity-id.ts'

interface EquipmentProps {
   name: string
   code: string
}

export class Equipment extends Entity<EquipmentProps> {
   get name() {
      return this.props.name
   }

   set name(name) {
      this.props.name = name
   }

   get code() {
      return this.props.code
   }

   set code(code) {
      this.props.code = code
   }

   static create(props: EquipmentProps, id?: UniqueEntityId) {
      const equipment = new Equipment(props, id)

      return equipment
   }
}
