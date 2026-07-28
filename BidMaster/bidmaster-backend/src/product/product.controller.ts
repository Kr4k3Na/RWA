import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Get()
  findAll(@Query('search') search: string, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.productService.findAll({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10,
      where: {
        title: { contains: search, mode: 'insensitive' }
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update({
      where: { id: Number(id) },
      data: updateProductDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove({ id: Number(id) });
  }
}
