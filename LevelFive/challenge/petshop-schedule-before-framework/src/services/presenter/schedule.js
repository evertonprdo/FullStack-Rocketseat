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

   static toHTTPRequest({ authorName, petName, description, date, time }) {
      return {
         authorName,
         petName,
         description,
         date: `${date}T${time}`,
      }
   }
}
