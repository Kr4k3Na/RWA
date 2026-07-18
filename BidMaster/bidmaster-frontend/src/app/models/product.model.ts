export interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    category: string;
    image: string[];
    state: 'new' | 'used';
    sellerId: string;
}