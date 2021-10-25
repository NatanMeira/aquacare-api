import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogRequest {
  public async handle(
    { request, logger, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const childLogger = logger.child({
      method: request.method(),
      url: request.completeUrl(true),
      status: response.getStatus(),
      // 'user-agent': request.headers()['user-agent'],
      // 'date': moment().toISOString(),
      body: request.body(),
    })

    childLogger.info('Log Request ...')
    await next()
  }
}
