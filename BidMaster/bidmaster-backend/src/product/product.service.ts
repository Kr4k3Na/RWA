import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product } from 'generated/prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductUncheckedCreateInput) {
    return this.prisma.product.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithAggregationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async findOne(query: Prisma.ProductWhereUniqueInput): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: query
    });
  }

  update(params: {
    data: Prisma.ProductUncheckedUpdateInput;
    where: Prisma.ProductWhereUniqueInput;
  }) {
    const { data, where } = params;
    return this.prisma.product.update({ data, where });
  }

  remove(where: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.delete({ where });
  }
}
