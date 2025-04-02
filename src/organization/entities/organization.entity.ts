import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  contactEmail: string;

  @Column()
  contactPhone: string;

  @OneToMany(() => Address, (address) => address.organization, {
    cascade: true,
  })
  addresses: Address[];

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
