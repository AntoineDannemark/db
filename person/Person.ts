import { Column, Entity, OneToMany  } from 'typeorm'
import { IsEmail, IsDateString, IsIn } from 'class-validator'

import Model from '../Model'
import { Phone } from '../phone/Phone'
import { Address } from '../address/Address'

export interface IPerson {
    firstname: string;
    lastname: string;
    birthDate: string;
    birthPlace: string;
    email: string;
    gender: string;
    bankAccount: string;
    bankCode: string;
    comment: string;    
}

@Entity()
export class Person extends Model implements IPerson {  

    @Column('varchar')
    firstname: string;

    @Column('varchar')
    lastname: string;

    @Column('varchar')
    @IsDateString()
    birthDate: string

    @Column('varchar')
    birthPlace: string

    @Column('varchar')
    @IsEmail()
    email: string;

    @Column('varchar')
    @IsIn(["m", "f", "x"])
    gender: string

    @Column('varchar')
    bankAccount: string

    @Column('varchar')
    bankCode: string

    @Column('varchar', { nullable: true })
    comment: string

    @OneToMany(() => Phone, phone => phone.owner)
    phones: Phone[]

    @OneToMany(() => Address, address => address.owner)
    addresses: Address[]

}