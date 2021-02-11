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

    // @Column()
    // ownerId: number;
    
    @ManyToOne(() => Person, person => person.addresses)
    @JoinColumn({ name: "ownerId" })
    owner: Person;
}
