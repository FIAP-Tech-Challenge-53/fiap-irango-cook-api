export default interface IOrderService {
  startCooking(pedidoId: number): Promise<void>;
  finishCooking(pedidoId: number): Promise<void>;
}

export const IOrderService = Symbol('IOrderService')
