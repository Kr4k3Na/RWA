export class CreateProductDto {
    title: string = '';
    description: string = '';
    price: string = '';
    category: string = '';
    image: string[] = [];
    state: 'new' | 'used' = 'new';
    sellerId: string = '';
}