import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateAuctionDto {
  @IsInt()
  productId: number;

  @IsNumber() @Min(0)
  startingPrice: number;

  @IsNumber() @Min(1)
  minimalBidStep: number;

  @IsOptional() @IsNumber() @Min(0)
  reservePrice?: number;

  @Type(() => Date) @IsDate()
  startDate: Date;

  @Type(() => Date) @IsDate()
  endDate: Date;
}