import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Ocisti postojece podatke (obrnutim redosledom zbog foreign key-eva)
  await prisma.bid.deleteMany();
  await prisma.auction.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // --- Users ---
  const seller = await prisma.user.create({
    data: {
      name: 'Marko',
      lastname: 'Markovic',
      email: 'seller@example.com',
      password: 'password123',
      role: 'seller',
      storeName: 'Markov Antikvarijat',
      payoutInfo: 'RS35123456789012345678',
    },
  });

  const buyer1 = await prisma.user.create({
    data: {
      name: 'Ana',
      lastname: 'Anic',
      email: 'buyer1@example.com',
      password: 'password123',
      role: 'buyer',
      deliveryAddress: 'Bulevar Oslobodjenja 10, Beograd',
    },
  });

  const buyer2 = await prisma.user.create({
    data: {
      name: 'Petar',
      lastname: 'Petrovic',
      email: 'buyer2@example.com',
      password: 'password123',
      role: 'buyer',
      deliveryAddress: 'Knez Mihailova 5, Beograd',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Admin',
      lastname: 'Administratorovic',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
      level: 'admin',
    },
  });

  // --- Products ---
  const product1 = await prisma.product.create({
    data: {
      title: 'Vintage gramofon',
      description: 'Ispravan gramofon iz 1970-ih, dobro ocuvan.',
      price: 150.0,
      category: 'Antikviteti',
      image: ['https://example.com/images/gramofon1.jpg'],
      state: 'used',
      sellerId: seller.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      title: 'Rucni sat - kolekcionarski primerak',
      description: 'Svajcarski sat, mehanicki navijni mehanizam.',
      price: 300.0,
      category: 'Nakit i satovi',
      image: ['https://example.com/images/sat1.jpg'],
      state: 'used',
      sellerId: seller.id,
    },
  });

  // --- Auctions ---
  const now = new Date();
  const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
  const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

  const activeAuction = await prisma.auction.create({
    data: {
      productId: product1.id,
      startingPrice: 100.0,
      currentPrice: 130.0,
      minimalBidStep: 5.0,
      reservePrice: 120.0,
      startDate: yesterday,
      endDate: inOneHour,
      status: 'active',
      bidCounter: 2,
    },
  });

  await prisma.auction.create({
    data: {
      productId: product2.id,
      startingPrice: 250.0,
      currentPrice: 250.0,
      minimalBidStep: 10.0,
      startDate: inOneHour,
      endDate: inThreeDays,
      status: 'soon',
      bidCounter: 0,
    },
  });

  // --- Bids (samo za activeAuction) ---
  await prisma.bid.createMany({
    data: [
      {
        auctionId: activeAuction.id,
        buyerId: buyer1.id,
        biddingPrice: 125.0,
        offerTime: twoDaysAgo,
      },
      {
        auctionId: activeAuction.id,
        buyerId: buyer2.id,
        biddingPrice: 130.0,
        offerTime: yesterday,
      },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());