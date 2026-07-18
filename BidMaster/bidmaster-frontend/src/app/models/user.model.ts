interface BaseUser {
    id: string;
    name: string;
    lastname: string;
    password: string;
    email: string;
}

interface Buyer extends BaseUser {
    role: 'buyer';
    deliveryAddress?: string;
}

interface Seller extends BaseUser {
    role: 'seller';
    payoutInfo?: string;
    storeName?: string;
}

interface Admin extends BaseUser {
    role: 'admin';
    level: 'admin' | 'moderator';
}

export type User = Buyer | Seller | Admin;