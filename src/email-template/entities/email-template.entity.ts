import { Occasion } from 'src/occasion/entities/occasion.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'email_templates' })
@Unique(['title'])
export class EmailTemplate {
    @PrimaryGeneratedColumn('uuid')
    email_template_id: string;

    @Column({ type: 'text', collation: 'utf8mb4_unicode_ci' })
    title: string;

    @Column({ type: 'text', collation: 'utf8mb4_unicode_ci' })
    subject: string;

    @Column({ type: 'text', collation: 'utf8mb4_unicode_ci' })
    body: string;

    @ManyToOne(() => Occasion, (occasion) => occasion.emailTemplates)
    @JoinColumn({ name: 'occasion_id' })
    occasion: Occasion;

    @Column()
    occasion_id: string;

    @ManyToOne(() => Organization, (organization) => organization)
    @JoinColumn({ name: 'organization_id' })
    organization: Organization;

    @Column()
    organization_id: string;

    @ManyToOne(() => User, (user) => user)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    user_id: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ default: false })
    is_delete: boolean;

    @CreateDateColumn()
    added_on: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
