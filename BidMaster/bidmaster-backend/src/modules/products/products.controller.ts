import { Controller, Get , Post, Param, Body } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
    @Get()
    findAll(): string {
        return 'This action returns all products'
    }
    @Get(':id')
    findOne(@Param() params: any): string {
        return `This action returns #${params.id} product`
    }
    @Post()
    create(@Body() createProductDto: CreateProductDto): string {
        return 'This action adds a new product'
    } 
}