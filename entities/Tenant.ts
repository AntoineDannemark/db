import { 
    BaseEntity,
    Entity, 
    // Column, 
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne,
    // OneToMany, 
    // CreateDateColumn, 
    // UpdateDateColumn, 
    // DeleteDateColumn, 
} from 'typeorm';

@Entity()
export class Tenant extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @OneToOne(() => People, people => people.tenant)
    @JoinColumn()
    people: People;

    // 
    // @OneToMany(() => File, file => file.owner)
    // photos: Photo[];
    // @CreateDateColumn()
    // created!: Date;

    // @UpdateDateColumn()
    // updated!: Date;

    // @DeleteDateColumn()
    // deletedAt?: Date;
}

// ref people
// oneToMany ref files
// domiciliation