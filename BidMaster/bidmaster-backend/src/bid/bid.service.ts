import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BidService {
  constructor(private prisma: PrismaService) {}

  findByAuction(auctionId: number) {
    return this.prisma.bid.findMany({
      where: { auctionId },
      orderBy: { offerTime: 'desc' },
      take: 50,
    });
  }

  async place(auctionId: number, buyerId: number, amount: number) {
    return this.prisma.$transaction(async (tx) => {
      const auction = await tx.auction.findUnique({
        where: { id: auctionId },
        include: { product: true },
      });
      if (!auction) throw new NotFoundException('Aukcija ne postoji');

      const now = new Date();
      if (auction.status !== 'active' || auction.endDate < now || auction.startDate > now) {
        throw new BadRequestException('Aukcija nije aktivna');
      }
      if (auction.product.sellerId === buyerId) {
        throw new BadRequestException('Ne možete licitirati na sopstvenu aukciju');
      }

      const current = Number(auction.currentPrice);
      const minimum = auction.bidCounter === 0
        ? Number(auction.startingPrice)
        : current + Number(auction.minimalBidStep);
      if (amount < minimum) {
        throw new BadRequestException(`Minimalna ponuda je ${minimum}`);
      }

      // atomski update: prolazi samo ako niko nije u međuvremenu podigao cenu
      const updated = await tx.auction.updateMany({
        where: { id: auctionId, currentPrice: { lt: amount } },
        data: { currentPrice: amount, bidCounter: { increment: 1 } },
      });
      if (updated.count === 0) {
        throw new BadRequestException('Neko je u međuvremenu dao veću ponudu');
      }

      const bid = await tx.bid.create({ data: { auctionId, buyerId, biddingPrice: amount } });
      const freshAuction = await tx.auction.findUnique({
        where: { id: auctionId },
        include: { product: true },
      });
      return { bid, auction: freshAuction };
    });
  }
}