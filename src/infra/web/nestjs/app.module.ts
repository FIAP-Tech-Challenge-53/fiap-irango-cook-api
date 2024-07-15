import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import MongoConfig from '@/config/mongo/MongoConfig'
import AppController from '@/infra/web/nestjs/app.controller'
import PedidosModule from '@/infra/web/nestjs/pedidos/pedidos.module'

export const appModules = [
  PedidosModule,
]

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(MongoConfig),
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
