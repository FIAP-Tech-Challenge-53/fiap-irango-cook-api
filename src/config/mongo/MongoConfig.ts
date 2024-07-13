
import { Environment as envs } from '@/infra/web/nestjs/environment'

export default `mongodb${envs.MONGO_PORT ? '' : '+srv'}://${envs.MONGO_USERNAME}:${envs.MONGO_PASSWORD}@${envs.MONGO_HOSTNAME}${envs.MONGO_PORT ? ':' + envs.MONGO_PORT : ''}/${envs.MONGO_DATABASE}?authSource=admin`
