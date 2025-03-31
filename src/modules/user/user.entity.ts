import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class User {
    @PrimaryGeneratedColumn()
    user_id: string;

    @Column({ unique: true })
    email: String;

    @Column()
    password: String;

    @Column()
    name: string;

    @Column({ unique: true })
    organization_id: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;




}