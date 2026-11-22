export type DispatchStatus = "PREPARING" | "PACKED" | "SHIPPED" | "DELIVERED";

export interface Dispatch {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  status: DispatchStatus;
  courierName?: string;
  trackingNumber?: string;
  shippedAt?: string;
  deliveredAt?: string;
}
