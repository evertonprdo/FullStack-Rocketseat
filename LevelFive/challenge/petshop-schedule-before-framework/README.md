# Application

## Summary

main => entryPoint

PageLoader => Main Controller

SchedulesService => Schedules ApiService
SchedulesPage => Sub Controller
FormModal => Sub Controller

## PageLoader

-  schedulesService
-  schedulePage
-  formModal

-  constructor({ SchedulesPage, FormModal, schedulesService }) =>
-  -  instance classes;
-  -  fetchSchedules()

-  fetchSchedules() => SchedulesPage.renderSchedules()
-  openForm() => formModal.reset()
-  toggleModal()

-  onQueryDateChange() => fetchSchedules()
-  onRemoveSchedule() => schedules.remove(); fetchSchedules()

-  onNewSchedule() =>
-  -  schedules.post();
-  -  fetchSchedules();
-  -  toggleModal();

## SchedulePage

-  queryDate
-  set queryDate => iptDate.value = queryDate

-  iptDate
-  schedulesList
-  btnNewSchedule

-  constructor({ btnOnClick, iptDateOnChange, onRemoveItem }) =>
-  -  get html elements;
-  -  add event listeners;
-  -  setup iptDate

-  onChangeIptDate() => set queryDate; callback(date)
-  onClickRemoveSchedule() => callback(scheduleId)
-  renderSchedule() =>
-  -  sections.innerHTML = '';
-  -  sections.append(createItem(scheduleData))

-  createItem()

## FormModal

-  modal
-  btnClose
-  form
-  inputs

-  constructor({ onSubmit, onClose }) =>
-  -  get html elements;
-  -  add event listeners;
-  -  this.setup()

-  setup() => set rules; reset();
-  reset() => clear fields

-  onIptDateChange() => set iptTime 'min' rule
-  onSubmit() => get input values; callback(iptsValues)

## SchedulesService

-  api
-  endpoint = 'schedules'

-  get() => filterByDate()

-  post()
-  delete()
