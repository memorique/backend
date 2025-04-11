import { Price } from "src/price/entities/price.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

export enum OrderStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
}

@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn()
    order_number: number;

    @Column()
    user_id: string;

    @Column()
    occasion_id: string;

    @Column()
    email_template_id: string;

    @Column("text")
    email_template_body: string;

    @Column()
    order_hash: string;

    @Column()
    order_url: string;

    @ManyToOne(() => Price, (price) => price.orders)
    @JoinColumn({ name: "price_id" })
    price: Price;

    @Column()
    price_id: string;

    @Column({ default: 202 })
    flow_id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @Column()
    shipped_on: Date;

    @Column()
    tracking_url: Date;

    @Column()
    delivered_on: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ default: false })
    is_delete: boolean;
}


