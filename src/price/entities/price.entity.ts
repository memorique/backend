import { Organization } from "src/organization/entities/organization.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({ name: "prices" })
export class Price {
    @PrimaryGeneratedColumn("uuid")
    price_id: string;

    @ManyToOne(() => Organization, (organization) => organization.prices)
    @JoinColumn({ name: "organization_id" })
    organization: Organization;

    @Column()
    organization_id: string;

    @Column("float")
    order_price: number;

    @Column("float")
    shipping_price: number;

    @Column("float")
    processing_fee: number;

    @Column("float")
    total_price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ default: false })
    is_delete: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    calculateTotalPrice() {
        this.total_price =
            this.order_price + this.shipping_price + this.processing_fee;
    }
}
