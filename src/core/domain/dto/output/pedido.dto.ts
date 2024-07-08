import { PedidoStatusEnum } from "@/core/domain/enums/pedido-status.enum";

export default interface PedidoDto {
  readonly id: number;
  readonly consumidorId?: string;
  readonly status: PedidoStatusEnum;
  readonly itens: object[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
