import { 
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Model from '../Model';
import { Person } from '../person/Person';

export interface IAddress {
    street: string;
    number: number,
    city: string;
    zip: number;
    country: string;
}

@Entity()
export class Address extends Model implements IAddress {

    @Column('varchar')
    street: string;

    @Column('int')
    number: number;  

    @Column('varchar')
    city: string;  

    @Column('int')
    zip: number;  
    
    @Column('varchar')
    country: string;  

    @Column('int')
    ownerId: number;
    @ManyToOne(() => Person, person => person.addresses)
    @JoinColumn({ name: "ownerId" })
    owner: Person;
}
