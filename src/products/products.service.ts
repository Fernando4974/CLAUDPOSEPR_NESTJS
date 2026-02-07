import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-images.entity';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImagesRepository: Repository<ProductImage>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    user: User,
    file: Express.Multer.File,
  ) {
    const { ...productDetails } = createProductDto;
    try {
      const uploadResult = await this.cloudinaryService.uploadFile(file);
      const urlImage = uploadResult.secure_url;
      const productImage = this.productImagesRepository.create({
        url: urlImage,
      });

      const product = this.productsRepository.create({
        ...productDetails,
        user,
        images: [productImage],
      });
      console.log('imgurl;', product.images);

      await this.productsRepository.save(product);
      return { ...product };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll() {
    const products = await this.productsRepository.find({});
    console.log(products);
    return products;
  }

  async findOne(id: string) {
    return await this.productsRepository.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  private handleDBErrors(error: any): never {
    // Implement your database error handling logic here
    if (error.code === '23505') {
      console.log(error);
      throw new ConflictException(
        'Product is already exist or keyName is already asigned',
      );
    }

    throw new InternalServerErrorException(
      'Database error occurred' + error.message,
    );
  }
}
