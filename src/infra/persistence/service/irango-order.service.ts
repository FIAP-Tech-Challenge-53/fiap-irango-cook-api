import { Injectable } from '@nestjs/common'

import { PublishCommand, SNSClient } from '@aws-sdk/client-sns'

import AwsConfig from '@/config/AwsConfig'
import IOrderService from '@/core/domain/services/iorder.service'
import { Environment as envs } from '@/infra/web/nestjs/environment'

@Injectable()
export default class IRangoOrderService implements IOrderService {
  constructor (
  ) {}

  async startCooking (pedidoId: number): Promise<void> {
    console.log(`Confirm cooking start for order with ID ${pedidoId} at IRango Order Service`)

    try {
      const client = new SNSClient(AwsConfig)
      const command = new PublishCommand({
        TopicArn: envs.SNS_TOPIC_COOKING_STARTED,
        Message: JSON.stringify({ pedidoId })
      })

      await client.send(command)
    } catch (error) {
      console.error(`Error: ${error}`)
      console.error(error)
    }
  }

  async finishCooking (pedidoId: number): Promise<void> {
    console.log(`Confirm cooking finish for order with ID ${pedidoId} at IRango Order Service`)

    try {
      const client = new SNSClient(AwsConfig)
      const command = new PublishCommand({
        TopicArn: envs.SNS_TOPIC_COOKING_FINISHED,
        Message: JSON.stringify({ pedidoId })
      })

      await client.send(command)
    } catch (error) {
      console.error(`Error: ${error}`)
      console.error(error)
    }
  }
}
