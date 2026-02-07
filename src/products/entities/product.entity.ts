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

  @Column({ type: 'decimal', nullable: false, default: 0 })
  price: number;

  @Column({ type: 'int', default: 0, nullable: true })
  stock: number;

  @Column({ type: 'text', unique: true, nullable: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  categorie: string;

  @Column({ type: 'text', unique: true, nullable: true })
  barcode: string;

  @Column({ type: 'boolean', nullable: true })
  posAvalible: boolean;

  @Column({ type: 'text', nullable: true, array: true })
  tags: string[];

  @Column({ type: 'int', nullable: true })
  numberKey: number;

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @BeforeInsert()
  @BeforeUpdate()
  checkSlug() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Quita acentos
      .replace(/[^a-z0-0]/g, '_') // Cambia cualquier cosa no alfanumérica por _
      .replace(/_{2,}/g, '_'); // Evita dobles guiones bajos
  }
}
