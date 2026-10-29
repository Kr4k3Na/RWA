import { ArrayMinSize, IsArray, IsIn, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsNumber() @Min(0) price: number;
  @IsString() category: string;
  @IsArray() @ArrayMinSize(1) @IsString({ each: true }) image: string[];
  @IsIn(['new', 'used']) state: 'new' | 'used';
}