import { BaseEntity, BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn  } from 'typeorm'
import { IsEmail, Length } from 'class-validator'
// import { v4 as uuidv4 } from 'uuid'

@Entity()
export class People extends BaseEntity {
    // @PrimaryColumn("varchar", { length: 36 }) 
    // id: string;
    @PrimaryGeneratedColumn('increment')
    id: number;


    @Column('varchar')
    firstname: string;

    @Column('varchar')
    lastname: string;

    @Column("varchar", { length: 255 })
    @IsEmail()
    @Length(5, 20)
    email: string;

    // @BeforeInsert()
    // addId() {
    //     this.id = uuidv4()
    // }
}