export type OrderStatus = "PENDING_PAYMENT" | "CONFIRMED" | "CANCELLED";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
}
