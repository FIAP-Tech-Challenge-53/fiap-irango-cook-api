
import { Environment as envs } from '@/infra/web/nestjs/environment'

const prod = envs.NODE_ENV === 'production'
const protocol = `mongodb${prod ? '+srv' : ''}`
const auth = `${envs.MONGO_USERNAME}:${envs.MONGO_PASSWORD}`
const host = `${envs.MONGO_HOSTNAME}${prod ? '' : ':' + envs.MONGO_PORT}`
const queryParams = `${prod ? '' : '?authSource=admin&directConnection=true'}`

export default `${protocol}://${auth}@${host}/${envs.MONGO_DATABASE}${queryParams}`
