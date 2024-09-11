import { Environment } from '@/infra/web/nestjs/environment'

describe('Test for static methods of Environment class', () => {
  it('test validate method when process.env.NODE_ENV is configured', () => {
    process.env.NODE_ENV = 'test'
    expect(() => { Environment.validate() }).not.toThrow(new Error('NODE_ENV is not defined'))
  })

  it('test validate method when process.env.NODE_ENV is not configured', () => {
    delete process.env.NODE_ENV
    expect(() => { Environment.validate() }).toThrow(new Error('NODE_ENV is not defined'))
  })

  it('test get NODE_ENV method', () => {
    process.env.NODE_ENV = 'test'
    expect(Environment.NODE_ENV).toEqual('test')
  })

  it('test get NODE_ENV method when NODE_ENV is not defined', () => {
    delete process.env.NODE_ENV
    expect(Environment.NODE_ENV).toEqual('development')
  })

  it('test get IS_DEV_ENV method', () => {
    process.env.NODE_ENV = 'local'
    expect(Environment.IS_DEV_ENV).toEqual(true)
  })

  it('test get PORT method', () => {
    process.env.PORT = '3000'
    expect(Environment.PORT).toEqual('3000')
  })

  it('test get PORT method when PORT is not defined', () => {
    delete process.env.PORT
    expect(Environment.PORT).toEqual(3003)
  })

  it('test get SENTRY_DSN method', () => {
    process.env.SENTRY_DSN = 'test'
    expect(Environment.SENTRY_DSN).toEqual('test')
  })

  it('test get SENTRY_DSN method when SENTRY_DSN is not defined', () => {
    delete process.env.SENTRY_DSN
    expect(Environment.SENTRY_DSN).toEqual('')
  })

  it('test get MONGO_HOSTNAME method', () => {
    process.env.MONGO_HOSTNAME = 'test'
    expect(Environment.MONGO_HOSTNAME).toEqual('test')
  })

  it('test get MONGO_HOSTNAME method when MONGO_HOSTNAME is not defined', () => {
    delete process.env.MONGO_HOSTNAME
    expect(Environment.MONGO_HOSTNAME).toEqual('localhost')
  })

  it('test get MONGO_PORT method', () => {
    process.env.MONGO_PORT = '3000'
    expect(Environment.MONGO_PORT).toEqual(3000)
  })

  it('test get MONGO_PORT method when MONGO_PORT is not defined', () => {
    delete process.env.MONGO_PORT
    expect(Environment.MONGO_PORT).toEqual(NaN)
  })

  it('test get MONGO_USERNAME method', () => {
    process.env.MONGO_USERNAME = 'test'
    expect(Environment.MONGO_USERNAME).toEqual('test')
  })

  it('test get MONGO_USERNAME method when MONGO_USERNAME is not defined', () => {
    delete process.env.MONGO_USERNAME
    expect(Environment.MONGO_USERNAME).toEqual('root')
  })

  it('test get MONGO_PASSWORD method', () => {
    process.env.MONGO_PASSWORD = 'test'
    expect(Environment.MONGO_PASSWORD).toEqual('test')
  })

  it('test get MONGO_PASSWORD method when MONGO_PASSWORD is not defined', () => {
    delete process.env.MONGO_PASSWORD
    expect(Environment.MONGO_PASSWORD).toEqual('password')
  })

  it('test get MONGO_DATABASE method', () => {
    process.env.MONGO_DATABASE = 'test'
    expect(Environment.MONGO_DATABASE).toEqual('test')
  })

  it('test get MONGO_DATABASE method when MONGO_DATABASE is not defined', () => {
    delete process.env.MONGO_DATABASE
    expect(Environment.MONGO_DATABASE).toEqual('irango_cook')
  })

  it('test get AWS_REGION method', () => {
    process.env.AWS_REGION = 'test'
    expect(Environment.AWS_REGION).toEqual('test')
  })

  it('test get AWS_REGION method default value', () => {
    delete process.env.AWS_REGION
    expect(Environment.AWS_REGION).toEqual('us-east-1')
  })

  it('test get AWS_ACCESS_KEY_ID method', () => {
    process.env.AWS_ACCESS_KEY_ID = 'test'
    expect(Environment.AWS_ACCESS_KEY_ID).toEqual('test')
  })

  it('test get AWS_ACCESS_KEY_ID method default value', () => {
    delete process.env.AWS_ACCESS_KEY_ID
    expect(Environment.AWS_ACCESS_KEY_ID).toEqual('qualquercoisa')
  })

  it('test get AWS_SECRET_ACCESS_KEY method', () => {
    process.env.AWS_SECRET_ACCESS_KEY = 'test'
    expect(Environment.AWS_SECRET_ACCESS_KEY).toEqual('test')
  })

  it('test get AWS_SECRET_ACCESS_KEY method default value', () => {
    delete process.env.AWS_SECRET_ACCESS_KEY
    expect(Environment.AWS_SECRET_ACCESS_KEY).toEqual('qualquercoisa')
  })

  it('test get SNS_TOPIC_COOKING_STARTED method', () => {
    process.env.SNS_TOPIC_COOKING_STARTED = 'test'
    expect(Environment.SNS_TOPIC_COOKING_STARTED).toEqual('test')
  })

  it('test get SNS_TOPIC_COOKING_STARTED method default value', () => {
    delete process.env.SNS_TOPIC_COOKING_STARTED
    expect(Environment.SNS_TOPIC_COOKING_STARTED).toEqual('arn:aws:sns:us-east-1:000000000000:fiap-irango-cook_cooking-started_dev')
  })

  it('test get SNS_TOPIC_COOKING_FINISHED method', () => {
    process.env.SNS_TOPIC_COOKING_FINISHED = 'test'
    expect(Environment.SNS_TOPIC_COOKING_FINISHED).toEqual('test')
  })

  it('test get SNS_TOPIC_COOKING_FINISHED method default value', () => {
    delete process.env.SNS_TOPIC_COOKING_FINISHED
    expect(Environment.SNS_TOPIC_COOKING_FINISHED).toEqual('arn:aws:sns:us-east-1:000000000000:fiap-irango-cook_cooking-finished_dev')
  })
})
