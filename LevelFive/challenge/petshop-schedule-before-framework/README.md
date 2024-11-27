# Application

## Summary
```
main.js => entryPoint

PageLoader => Main Controller

schedules-service.js => Schedules Api Service
schedules-page.js => Sub Controller
form-modal.js => Sub Controller
```

## Classes

### PageLoader
```
// props
-  schedulesService
-  schedulePage
-  formModal

-  constructor({ SchedulesPage, FormModal, schedulesService }) =>
-  -  instance classes;
-  -  fetchSchedules()

// methods
-  fetchSchedules() => SchedulesPage.renderSchedules()
-  openForm() => formModal.reset()
-  toggleModal()

-  onQueryDateChange() => fetchSchedules()
-  onRemoveSchedule() => schedules.remove(); fetchSchedules()

-  onNewSchedule() =>
-  -  schedules.post();
-  -  fetchSchedules();
-  -  toggleModal();
```
### SchedulePage
```
// props
-  queryDate
-  set queryDate => iptDate.value = queryDate

-  iptDate
-  schedulesList
-  btnNewSchedule

-  constructor({ btnOnClick, iptDateOnChange, onRemoveItem }) =>
-  -  get html elements;
-  -  add event listeners;
-  -  setup iptDate

// methods
-  onChangeIptDate() => set queryDate; callback(date)
-  onClickRemoveSchedule() => callback(scheduleId)
-  renderSchedule() =>
-  -  sections.innerHTML = '';
-  -  sections.append(createItem(scheduleData))

-  createItem()
```
### FormModal
```
// props
-  modal
-  btnClose
-  form
-  inputs

// methods
-  constructor({ onSubmit, onClose }) =>
-  -  get html elements;
-  -  add event listeners;
-  -  this.setup()

-  setup() => set rules; reset();
-  reset() => clear fields

-  onIptDateChange() => set iptTime 'min' rule
-  onSubmit() => get input values; callback(iptsValues)
```
### SchedulesService
```
// props
-  api
-  endpoint = 'schedules'

// methods
-  get() => filterByDate()

-  post()
-  delete()
```
