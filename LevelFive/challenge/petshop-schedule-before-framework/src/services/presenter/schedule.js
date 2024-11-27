import dayjs from 'dayjs'

export class SchedulePresenter {
   static toScheduleItemList({ id, authorName, petName, description, date }) {
      return {
         id,
         authorName,
         petName,
         description,
         time: dayjs(date).format('h A'),
      }
   }
}
