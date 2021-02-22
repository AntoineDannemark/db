import { 
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Model from '../Model';
import { Person } from '../person/Person';

export interface IPhone {
    prefix: number;
    number: number;
}

@Entity()
export class Phone extends Model implements IPhone{

    @Column('int')
    prefix: number;

    @Column('int')
    number: number;  
    
    @ManyToOne(() => Person, person => person.phones)
    @JoinColumn({ name: "owner_id" })
    owner: Person;
}
