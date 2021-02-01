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
export class Phone extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    // TODO Check appropriate type
    @Column('int')
    prefix!: number;

    // TODO Check appropriate type
    @Column('int')
    number!: number;  

    @Column()
    ownerId: number;
    @ManyToOne(() => People, people => people.phone)
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
