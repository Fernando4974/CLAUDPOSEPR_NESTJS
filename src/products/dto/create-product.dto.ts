import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  title: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNumber()
  @IsOptional()
  price: number;
  @IsNumber()
  stock: number;
  @IsOptional()
  @IsString()
  slug?: string;
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  tags?: string[];
}
