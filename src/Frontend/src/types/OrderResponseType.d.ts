export interface OrderResponse {
  orderId: number;
  itemName: string;
  userFullName: string;
  userPhoneNumber: string;
  userEmail: string;
  status: PurchaseStatus;
}

export interface OrderWithItemId extends OrderResponse {
  itemId: number;
}

type PurchaseStatus = 'waiting' | 'received' | 'canceled';
