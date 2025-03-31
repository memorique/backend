import { PrimaryColumn, Column } from "typeorm";

export class Newsletter {
     @PrimaryColumn()
      newsletter_id: string; 
      
      @Column()
      email: string;
}
