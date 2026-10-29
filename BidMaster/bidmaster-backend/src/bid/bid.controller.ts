import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { BidService } from './bid.service';
import { PlaceBidDto } from './dto/place-bid.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/user.entity';

@Controller('auctions/:auctionId/bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Get()
  list(@Param('auctionId', ParseIntPipe) auctionId: number) {
    return this.bidService.findByAuction(auctionId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.buyer)
  place(
    @Param('auctionId', ParseIntPipe) auctionId: number,
    @Body() dto: PlaceBidDto,
    @Request() req,
  ) {
    return this.bidService.place(auctionId, req.user.id, dto.amount);
  }
}