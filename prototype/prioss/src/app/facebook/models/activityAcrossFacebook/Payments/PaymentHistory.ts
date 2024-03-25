/**{
    "payments_v2": {
      "preferred_currency": "EUR",
      "payments": [
        
      ]
    }
  } */
export interface PaymentsModel {
  payments_v2: Payments;
}
export interface Payments {
  preferred_currency: string;
  payments: PaymentsItem[];
}
export interface PaymentsItem {
  timestamp: number;
  data: PaymentsData[];
  title: string;
}
export interface PaymentsData {
  payment: Payment;
}
export interface Payment {
  timestamp: number;
  amount: number;
  currency: string;
  payment_type: string;
  status: string;
  merchant: string;
  description: string;
}
