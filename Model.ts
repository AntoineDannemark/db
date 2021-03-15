import { 
    BaseEntity, 
    BeforeInsert, 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn,
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { v4 as uuid } from 'uuid'

export default abstract class Model extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'uuid' })
    uuid: string

    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid()
    }
}