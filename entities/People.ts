import { 
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    // CreateDateColumn,
    // UpdateDateColumn,
    // DeleteDateColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';
import { Tenant } from './Tenant';
import { Phone } from './Phone';
import { Address } from './Address';

@Entity()
export class People extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    // TODO Check appropriate type
    @Column('varchar')
    firstname!: string;

    // TODO Check appropriate type
    @Column('varchar')
    lastame!: string;

    @Column('varchar')
    birthDate!: Date;

    // TODO Check appropriate type
    @Column('varchar')
    birthPlace!: string;

    // TODO Use enum
    @Column('varchar')
    gender!: string;

    // TODO Use class-validator
    @Column('varchar')
    email!: string;

    // TODO Check appropriate type
    @Column('varchar')
    comment!: string;

    // TODO Check appropriate length
    @Column('varchar')
    bankAccount!: string;

    // TODO Check appropriate length
    @Column('varchar')
    bankCode!: string;

    @OneToMany(() => Phone, phone => phone.owner)
    phones: Phone[];
    
    @OneToMany(() => Address, address => address.owner)
    addresses: Address[];

    @OneToOne(() => Tenant, tenant => tenant.people)
    tenant: Tenant;

    // TODO Check if really required, supposedly added automatically
    // @CreateDateColumn()
    // created!: Date;

    // @UpdateDateColumn()
    // updated!: Date;

    // @DeleteDateColumn()
    // deletedAt?: Date;
}
