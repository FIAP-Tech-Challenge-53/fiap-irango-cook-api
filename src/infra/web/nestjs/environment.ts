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
    return process.env.MONGO_HOSTNAME || '10.11.0.14'
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

  static get AWS_REGION () {
    return process.env.AWS_REGION || 'us-east-1'
  }

  static get AWS_ACCESS_KEY_ID () {
    return process.env.AWS_ACCESS_KEY_ID || 'qualquercoisa'
  }

  static get AWS_SECRET_ACCESS_KEY () {
    return process.env.AWS_SECRET_ACCESS_KEY || 'qualquercoisa'
  }

  static get SNS_TOPIC_COOKING_STARTED () {
    return process.env.SNS_TOPIC_COOKING_STARTED || 'arn:aws:sns:us-east-1:000000000000:fiap-irango-cook_cooking-started_dev'
  }

  static get SNS_TOPIC_COOKING_FINISHED () {
    return process.env.SNS_TOPIC_COOKING_FINISHED || 'arn:aws:sns:us-east-1:000000000000:fiap-irango-cook_cooking-finished_dev'
  }

  static get CONFIRM_PAYMENT_QUEUE () {
    return process.env.CONFIRM_PAYMENT_QUEUE || 'fiap-irango-cook_payment-confirmed_dev'
  }

  static get CREATED_ORDER_QUEUE() {
    return process.env.CREATED_ORDER_QUEUE || 'fiap-irango-cook_order-created_dev'
  }

  static get URL_QUEUE() {
    return process.env.URL_QUEUE || 'http://localhost:4566/000000000000/'
  }
}
