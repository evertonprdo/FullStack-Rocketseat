import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new"
import { schedulesDay } from "../schedules/load"

const form = document.querySelector('form')
const clientName = document.getElementById('client')
const selectedDate = document.getElementById('date')

const iptToday = dayjs(new Date()).format("YYYY-MM-DD")

selectedDate.value = iptToday
selectedDate.min = iptToday

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    const name = clientName.value.trim()

    if (!name) {
      return alert('Informe o nome do client!')
    }

    const hourSelected = document.querySelector('.hour-selected')

    if (!hourSelected) {
      return alert('Selecione a hora.')
    }

    const [hour] = hourSelected.innerText.split(':')

    const when = dayjs(selectedDate.value).add(hour, 'hour')
    const id = String(new Date().getTime())

    await scheduleNew({
      id,
      when,
      name
    })

    await schedulesDay()
    clientName.value = ''

  } catch (error) {
    alert("Não foi possível realizar o agendamento")
  }
}