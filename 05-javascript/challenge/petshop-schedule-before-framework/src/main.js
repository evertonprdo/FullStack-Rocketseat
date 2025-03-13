// CSS
import './styles/global.css'
import './styles/layout.css'
import './styles/form.css'

// JS
import { PageLoader } from './modules/page-loader.js'
import { ApiService } from './services/apiService.js'
import { SchedulesService } from './services/schedules.js'
import { SchedulesPage } from './modules/schedule-page.js'
import { FormModal } from './modules/form-modal.js'

const apiService = new ApiService({ baseUrl: 'http://localhost:3333' })
const schedulesService = new SchedulesService(apiService)

new PageLoader({
   SchedulesPage,
   FormModal,
   schedulesService,
})
