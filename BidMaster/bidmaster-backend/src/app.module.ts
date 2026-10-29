import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuctionModule } from './auction/auction.module';
import { BidModule } from './bid/bid.module';

@Module({
  imports: [PrismaModule, ProductModule, AuthModule, UserModule, AuctionModule, BidModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}