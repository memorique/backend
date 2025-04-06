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
  BeforeInsert,
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

  @Column()
  invite_code: string;

  @Column({ type: "text", collation: 'utf8mb4_unicode_ci' })
  signature: string;

  @ManyToOne(() => Organization, (organization) => organization.users)
  @JoinColumn({ name: "organization_id" })
  organization: Organization;

  @Column()
  organization_id: string;

  @OneToMany(() => EmailTemplate, (emailTemplates) => emailTemplates)
  email_templates: EmailTemplate[];

  @OneToMany(() => Occasion, (occasion) => occasion)
  occasion: Occasion[];

  @Column({ default: false })
  is_blocked: boolean;

  @CreateDateColumn()
  blocked_on: Date;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_delete: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  generateDefaults() {
    this.signature = `<p>Best regards</p><p>${this.name}</p>`;
    const firstName = this.name?.split(' ')[0] ?? 'User';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.invite_code = `${firstName}${randomNum}`;
  }
}
