import { User } from 'src/auth/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-images.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'float', nullable: false, default: 0 })
  price: number;
  @Column({ type: 'int', default: 0, nullable: false })
  stock: number;
  @Column({ type: 'text', unique: true, nullable: true })
  slug: string;
  @Column({ type: 'text', nullable: true, array: true })
  tags: string[];
  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    eager: true,
  })
  images: ProductImage[];
  @BeforeInsert()
  generateSlug() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
  @BeforeUpdate()
  updateSlug() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
