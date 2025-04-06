import { EmailTemplate } from "src/email-template/entities/email-template.entity";
import { Organization } from "src/organization/entities/organization.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: "occasions" })
@Unique(['name', 'organization_id'])
export class Occasion {
    @PrimaryGeneratedColumn('uuid')
    occasion_id: string;

    @Column({ type: "text", collation: 'utf8mb4_unicode_ci' })
    name: string;

    @OneToMany(() => EmailTemplate, (emailTemplate) => emailTemplate.occasion)
    emailTemplates: EmailTemplate[];

    @ManyToOne(() => Organization, (organization) => organization)
    @JoinColumn({ name: "organization_id" })
    organization: Organization;

    @Column()
    organization_id: string;

    @ManyToOne(() => User, (user) => user)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    user_id: string;

    @Column({ default: true })
    is_active: Boolean;

    @CreateDateColumn()
    added_on: Date;

    @UpdateDateColumn()
    updated_on: Date;
}
