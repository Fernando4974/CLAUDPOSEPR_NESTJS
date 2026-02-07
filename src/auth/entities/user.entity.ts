import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/products/entities/product.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', unique: true, nullable: false })
  email: string;
  @Column({ type: 'text', nullable: false })
  password: string;
  @Column({ type: 'text', nullable: false })
  name: string;
  @Column({ type: 'text', nullable: false })
  lastname: string;
  @Column({ type: 'text', nullable: true, array: true, default: ['user'] })
  roles: string[];
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // entities relationships can be defined here
  @OneToMany(() => Product, (product) => product.user)
  products: Product;

  @BeforeInsert()
  normalizeEmail() {
    this.email = this.email.toLowerCase().trim();
  }
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
