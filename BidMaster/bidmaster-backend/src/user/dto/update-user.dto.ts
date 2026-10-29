import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() lastname?: string;
  @IsOptional() @IsString() deliveryAddress?: string;
  @IsOptional() @IsString() payoutInfo?: string;
  @IsOptional() @IsString() storeName?: string;
}