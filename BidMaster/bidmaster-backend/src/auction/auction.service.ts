import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuctionDto } from './dto/create-auction.dto';

export interface AuctionQuery {
  search?: string;
  category?: string;
  state?: 'new' | 'used';
  status?: 'active' | 'soon' | 'ended';
  sort?: 'closing-soon' | 'price-asc' | 'price-desc' | 'most-bids';
  skip?: number;
  take?: number;
}

@Injectable()
export class AuctionService {
  constructor(private prisma: PrismaService) {}

  async findAll(q: AuctionQuery) {
    const where: Prisma.AuctionWhereInput = {
      ...(q.status && { status: q.status }),
      product: {
        ...(q.search && {
          OR: [
            { title: { contains: q.search, mode: 'insensitive' } },
            { description: { contains: q.search, mode: 'insensitive' } },
          ],
        }),
        ...(q.category && { category: q.category }),
        ...(q.state && { state: q.state }),
      },
    };

    const orderBy: Prisma.AuctionOrderByWithRelationInput =
      q.sort === 'price-asc' ? { currentPrice: 'asc' }
      : q.sort === 'price-desc' ? { currentPrice: 'desc' }
      : q.sort === 'most-bids' ? { bidCounter: 'desc' }
      : { endDate: 'asc' };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.auction.findMany({
        where, orderBy,
        skip: q.skip ?? 0,
        take: q.take ?? 20,
        include: { product: true },
      }),
      this.prisma.auction.count({ where }),
    ]);
    return { items, total };
  }

  async findOne(id: number) {
    const auction = await this.prisma.auction.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!auction) throw new NotFoundException('Aukcija ne postoji');
    return auction;
  }

  async categories() {
    const rows = await this.prisma.product.findMany({
      where: { auction: { isNot: null } },
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });
    return rows.map((r) => r.category);
  }

  async create(dto: CreateAuctionDto, userId: number, isAdmin: boolean) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
      include: { auction: true },
    });
    if (!product) throw new NotFoundException('Proizvod ne postoji');
    if (product.sellerId !== userId && !isAdmin) throw new BadRequestException('Proizvod nije vaš');
    if (product.auction) throw new BadRequestException('Proizvod već ima aukciju');
    if (dto.endDate <= dto.startDate) throw new BadRequestException('Kraj mora biti posle početka');

    return this.prisma.auction.create({
      data: {
        productId: dto.productId,
        startingPrice: dto.startingPrice,
        currentPrice: dto.startingPrice,
        minimalBidStep: dto.minimalBidStep,
        reservePrice: dto.reservePrice,
        startDate: dto.startDate,
        endDate: dto.endDate,
        status: dto.startDate <= new Date() ? 'active' : 'soon',
      },
      include: { product: true },
    });
  }
}