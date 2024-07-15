export class Environment {
  static validate () {
    if (!process.env.NODE_ENV) throw new Error('NODE_ENV is not defined')
  }

  static get NODE_ENV () {
    return process.env.NODE_ENV || 'development'
  }

  static get IS_DEV_ENV () {
    const devEnvs = ['development', 'local']
    return devEnvs.includes(Environment.NODE_ENV)
  }

  static get PORT () {
    return process.env.PORT || 3003
  }

  static get SENTRY_DSN () {
    return process.env.SENTRY_DSN || ''
  }

  static get MONGO_HOSTNAME () {
    return process.env.MONGO_HOSTNAME || 'localhost'
  }

  static get MONGO_PORT (): number {
    return Number(process.env.MONGO_PORT)
  }

  static get MONGO_DATABASE () {
    return process.env.MONGO_DATABASE || 'irango_cook'
  }

  static get MONGO_USERNAME () {
    return process.env.MONGO_USERNAME || 'root'
  }

  static get MONGO_PASSWORD () {
    return process.env.MONGO_PASSWORD || 'password'
  }

  static get DB_CONNECTION_TIMEOUT (): number {
    return Number(process.env.DB_CONNECTION_TIMEOUT) || 30000
  }

  static get SERVICE_IRANGO_ORDER_API () {
    return process.env.SERVICE_IRANGO_ORDER_API || 'http://localhost:3001'
  }
}
