import * as cuid from "cuid"

export interface CartItem {
    id: number
    productName: string
    price: number
    quantity: number
    pictureUrl: string
    brand: string
    type: string
}

export interface Cart {
    id: string;
    items: CartItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    shippingPrice: number;
}

export class Cart implements Cart {
    id = cuid();
    items: CartItem[] = [];
}

export interface CartTotals {
    shipping: number;
    subtotal: number;
    total: number;

}