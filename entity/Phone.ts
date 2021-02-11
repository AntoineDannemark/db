import { 
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Model from './Model';
import { Person } from './Person';

@Entity()
export class Phone extends Model {

    @Column('int')
    prefix: number;

    @Column('int')
    number: number;  

    // @Column('int')
    // ownerId: number;
    
    @ManyToOne(() => Person, person => person.phones)
    @JoinColumn({ name: "ownerId" })
    owner: Person;
}
