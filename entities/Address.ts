import { 
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    // CreateDateColumn,
    // UpdateDateColumn,
    // DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { People } from './People';

@Entity()
export class Address extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    // TODO Check appropriate type
    @Column('varchar')
    street!: string;

    // TODO Check appropriate type
    @Column('int')
    number!: number;  

    // TODO Check appropriate type
    @Column('varchar')
    postalBox!: string;

    // TODO Check appropriate type
    @Column('int')
    postalCode!: number;

    // TODO Check appropriate type
    @Column('string')
    country!: string;

    @Column()
    ownerId: number;
    @ManyToOne(() => People, people => people.addresses)
    @JoinColumn({ name: "ownerId" })
    owner: People;

    // TODO Check if really required, supposedly added automatically
    // @CreateDateColumn()
    // created!: Date;

    // @UpdateDateColumn()
    // updated!: Date;

    // @DeleteDateColumn()
    // deletedAt?: Date;
}
