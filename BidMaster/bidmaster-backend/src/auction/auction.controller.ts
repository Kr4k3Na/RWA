import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/user.entity';

@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('state') state?: 'new' | 'used',
    @Query('status') status?: 'active' | 'soon' | 'ended',
    @Query('sort') sort?: 'closing-soon' | 'price-asc' | 'price-desc' | 'most-bids',
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.auctionService.findAll({
      search, category, state, status, sort,
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }

  // mora pre ':id' da ga ruta ne proguta
  @Get('categories')
  categories() {
    return this.auctionService.categories();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.auctionService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.seller, Role.admin)
  create(@Body() dto: CreateAuctionDto, @Request() req) {
    return this.auctionService.create(dto, req.user.id, req.user.role === Role.admin);
  }
}