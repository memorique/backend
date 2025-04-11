import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
    price_id: number;

    @Column()
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

    @Column()
    is_delete: boolean;


}
