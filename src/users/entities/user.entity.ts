import { EmailTemplate } from 'src/email-template/entities/email-template.entity';
import { Occasion } from 'src/occasion/entities/occasion.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @ManyToOne(() => Organization, (organization) => organization.users)
  @JoinColumn({ name: "organization_id" })
  organization: Organization;

  @Column()
  organization_id: string;

  @OneToMany(() => EmailTemplate, (emailTemplates) => emailTemplates)
  email_templates: EmailTemplate[];

  @OneToMany(() => Occasion, (occasion) => occasion)
  occasion: Occasion[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
