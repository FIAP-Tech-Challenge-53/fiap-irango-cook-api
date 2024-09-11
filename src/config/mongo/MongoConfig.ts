
import { Environment as envs } from '@/infra/web/nestjs/environment'

const protocol = `mongodb${envs.MONGO_PORT ? '' : '+srv'}`
const auth = `${envs.MONGO_USERNAME}:${envs.MONGO_PASSWORD}`
const host = `${envs.MONGO_HOSTNAME}${envs.MONGO_PORT ? ':' + envs.MONGO_PORT : ''}`
const queryParams = `authSource=admin&directConnection=${envs.MONGO_PORT ? 'true' : 'false'}`

export default `${protocol}://${auth}@${host}/${envs.MONGO_DATABASE}?${queryParams}`
