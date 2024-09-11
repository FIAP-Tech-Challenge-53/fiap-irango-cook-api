import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { SqsModule } from '@ssut/nestjs-sqs'

import MongoConfig from '@/config/mongo/MongoConfig'
import QueueConfig from '@/config/QueueConfig'
import AppController from '@/infra/web/nestjs/app.controller'
import PedidosModule from '@/infra/web/nestjs/pedidos/pedidos.module'

export const appModules = [
  PedidosModule,
]

console.log(MongoConfig)
@Global()
@Module({
  imports: [
    MongooseModule.forRoot(MongoConfig),
    SqsModule.register(QueueConfig),

    ...appModules
  ],
  controllers: [
    AppController
  ],
  providers: [
  ],
  exports: [
  ]
})
export default class AppModule {
}
