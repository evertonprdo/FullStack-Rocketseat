import { Entity } from './entity.ts'
import { UniqueEntityId } from './unique-entity-id.ts'

interface EquipmentProps {
   name: string
}

export class Equipment extends Entity<EquipmentProps> {
   get name() {
      return this.props.name
   }

   set name(name) {
      this.props.name = name
   }

   static create(props: EquipmentProps, id?: UniqueEntityId) {
      const equipment = new Equipment(props, id)

      return equipment
   }
}
