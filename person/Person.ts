import { 
    Column,
    Entity, 
    OneToMany,
    BeforeInsert,
    BeforeUpdate, 
} from 'typeorm'
import { 
    IsEmail,
    IsDateString,
    IsIn,
    IsDefined,
    validateOrReject, 
} from 'class-validator'

import Model from '../Model'
import { Phone } from '../phone/Phone'
import { Address } from '../address/Address'

export interface IPerson {
    id?: number;
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
    @IsDefined()
    firstname: string;

    @Column('varchar')
    @IsDefined()
    lastname: string;

    @Column('varchar')
    // @IsDefined()
    @IsDateString()
    birthDate: string

    @Column('varchar')
    // @IsDefined()
    birthPlace: string

    @Column('varchar')
    @IsDefined()
    @IsEmail()
    email: string;

    @Column('varchar')
    @IsDefined()
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

    // HOOKS
    @BeforeInsert()
    @BeforeUpdate()
    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}