
import {type Product } from './productTypes';
import {type Address,type User } from './userTypes';

export interface OrderState {
    orders: Order[];
    orderItem:OrderItem | null;
    currentOrder: Order | null;
    paymentOrder: any | null;
    loading: boolean;
    error: string | null;
    orderCanceled: boolean
}

export interface Order {
    _id: string;
    orderId: string;
    user: User;
    sellerId: string;
    orderItems: OrderItem[];
    orderDate: string; 
    shippingAddress: Address;
    paymentDetails: any;
    totalMrpPrice: number;
    totalSellingPrice?: number; // Optional field
    discount?: number; // Optional field
    orderStatus: OrderStatus;
    totalItem: number;
    deliverDate:string;
}

export type OrderStatus =
  | 'PENDING'
  | 'PLACED'
  | 'CONFIRMED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
    _id: string;
    order: Order;
    product: Product;
    size: string;
    quantity: number;
    mrpPrice: number;
    sellingPrice: number; 
    userId: number;
}
