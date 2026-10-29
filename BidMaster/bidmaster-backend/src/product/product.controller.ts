import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/user.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.seller, Role.admin)
  create(@Body() dto: CreateProductDto, @Request() req) {
    return this.productService.create({ ...dto, sellerId: req.user.id });
  }

  @Get()
  findAll(@Query('search') search?: string, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.productService.findAll({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10,
      where: search ? { title: { contains: search, mode: 'insensitive' } } : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.seller, Role.admin)
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto, @Request() req) {
    await this.assertOwner(Number(id), req.user);
    return this.productService.update({ where: { id: Number(id) }, data: dto });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.seller, Role.admin)
  async remove(@Param('id') id: string, @Request() req) {
    await this.assertOwner(Number(id), req.user);
    return this.productService.remove({ id: Number(id) });
  }

  private async assertOwner(productId: number, user: { id: number; role: Role }) {
    const product = await this.productService.findOne({ id: productId });
    if (!product) throw new NotFoundException();
    if (product.sellerId !== user.id && user.role !== Role.admin) throw new ForbiddenException();
  }
}