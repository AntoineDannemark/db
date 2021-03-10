import { 
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Model from '../Model';
import { Person } from '../person/Person';

export interface IAddress {
    id?: number;
    street: string;
    number: string;
    city: string;
    zip: string;
    country: string;
}

@Entity()
export class Address extends Model implements IAddress {

    @Column('varchar')
    street: string;

    @Column('varchar')
    number: string;  

    @Column('varchar')
    city: string;  

    @Column('varchar')
    zip: string;  
    
    @Column('varchar')
    country: string;  

    @ManyToOne(() => Person, person => person.addresses)
    @JoinColumn({ name: "owner_id" })
    owner: Person;
}
