import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity('contactus')
export class ContactUs {
  @PrimaryColumn()
  contact_us_id: string; 

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  gift_volume: string;

  @Column('text')
  usecase: string;

  @Column('text')
  message: string;

  @CreateDateColumn({ name: 'contacted_on', type: 'timestamp' })
  contactedOn: Date;
}