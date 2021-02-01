import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Tenant {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column('varchar')
    firstname!: string;

    @Column('varchar')
    lastname!: string;

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}
