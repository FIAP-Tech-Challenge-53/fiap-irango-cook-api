
import { Environment } from '@/infra/web/nestjs/environment';
import { SqsOptions } from '@ssut/nestjs-sqs/dist/sqs.types'


const config = {
  consumers: [
    {
      name: Environment.CONFIRM_PAYMENT_QUEUE,
      queueUrl: Environment.URL_QUEUE.concat(Environment.CONFIRM_PAYMENT_QUEUE),
      region: Environment.AWS_REGION,
    },
    {
      name: Environment.CREATED_ORDER_QUEUE,
      queueUrl: Environment.URL_QUEUE.concat(Environment.CREATED_ORDER_QUEUE),
      region: Environment.AWS_REGION,
    },
  ],
  producers: [],
} as SqsOptions

export default config;
