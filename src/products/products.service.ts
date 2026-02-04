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

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const product = this.productsRepository.create({
        ...createProductDto,
        user,
      });
      return await this.productsRepository.save(product);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll() {
    const products = await this.productsRepository.find({});
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
