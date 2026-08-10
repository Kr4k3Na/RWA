export enum Role {
    admin = 'admin',
    buyer = 'buyer',
    seller = 'seller',
}

export enum AdminLevel {
    admin = 'admin',
    moderator = 'moderator'
}

export class User {
    id: number;
    name: string;
    lastname: string;
    password: string;
    email: string;
    role: Role;
    // buyer specific
    deliveryAddress?: string;
    // seller specific
    payoutInfo?: string;
    storeName?: string;
    // admin specific
    level?: AdminLevel;
}

