import { 
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Model from './Model';
import { Person } from './Person';

@Entity()
export class Address extends Model {

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

    @ManyToOne(() => Person, person => person.addresses)
    @JoinColumn({ name: "ownerId" })
    owner: Person;
}
