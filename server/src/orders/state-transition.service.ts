import { OrderStatus } from "./enum/status.enum";



export class StateTransitionService {
    /**
     * Checks validity of state transition
     * @param currentStatus 
     * @param newStatus 
     */
  static isValidTransition(currentStatus: OrderStatus, newStatus: OrderStatus): boolean {
    switch (currentStatus) {
      case OrderStatus.PENDING:
        return newStatus === OrderStatus.IN_PREPARATION || newStatus === OrderStatus.CANCELLED;
      case OrderStatus.IN_PREPARATION:
        return newStatus === OrderStatus.READY_FOR_PICKUP || newStatus === OrderStatus.CANCELLED;
      case OrderStatus.READY_FOR_PICKUP:
        return newStatus === OrderStatus.COMPLETED;
      // Additional cases
      default:
        return false;
    }
  }

  /**
   * Performs transition between states
   * @param order 
   * @param newStatus 
   */
  static performTransition(order: any, newStatus: OrderStatus): void {
    if (!this.isValidTransition(order.status.name, newStatus)) {
      throw new Error(`Invalid state transition from ${order.status.name} to ${newStatus}`);
    }

    order.status = { name: newStatus }; 
  }
}
