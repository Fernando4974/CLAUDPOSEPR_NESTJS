import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
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
  @IsOptional()
  @IsString()
  barcode?: string;
  @IsNumber()
  price: number;
  @IsNumber()
  @IsOptional()
  stock?: number;
  @IsOptional()
  @IsString()
  slug?: string;
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  tags?: string[];
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Max(25)
  numberKey?: number;
  @IsBoolean()
  @IsOptional()
  posAvalible?: boolean;
  @IsString()
  @IsOptional()
  categorie: string;
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string;
}
