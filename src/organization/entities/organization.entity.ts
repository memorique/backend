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
import { EmailTemplate } from 'src/email-template/entities/email-template.entity';
import { Occasion } from 'src/occasion/entities/occasion.entity';

@Entity({ name: "organizations" })
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  organization_id: string;

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

  @OneToMany(() => EmailTemplate, (emailTemplate) => emailTemplate.organization)
  email_templates: EmailTemplate[];

  @OneToMany(() => Occasion, (occasion) => occasion.organization)
  occasion: Occasion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
