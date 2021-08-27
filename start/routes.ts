import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.on('/').redirect('/health')
Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.post('/login', 'Auth/LoginController.login').as('login')
Route.post('/device/login', 'Auth/LoginController.deviceLogin').as('device.login')
Route.post('/register', 'Auth/RegisterController.register').as('register')
Route.post('/logout', 'Auth/LoginController.logout').as('logout')

Route.group(() => {
  Route.get('/profile', 'ProfileController.profile').as('profile')
  Route.resource('/aquarium', 'AquariumsController').as('aquarium')
  Route.resource('/device', 'DevicesController').as('device')
  Route.get('/aquarium/stats/:id', 'AquariumsController.getStats').as('aquarium.getStats')
  Route.get('/user/aquarium/:id', 'UsersController.getAquariums').as('user.getAquariums')
  Route.get('/user/device/:id', 'UsersController.getDevices').as('user.getDevices')
}).middleware('auth:api')

Route.group(() => {
  Route.resource('/stats', 'StatsController').as('stats')
}).middleware('auth:device')
