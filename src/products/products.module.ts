import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-images.entity';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, CloudinaryService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
    AuthModule,
    CloudinaryModule,
  ],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
