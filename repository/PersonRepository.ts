import { EntityRepository, Repository } from 'typeorm';
import { Person } from '../entity/Person';

@EntityRepository(Person) 
export class PersonRepository extends Repository<Person> {
    findByName(firstname: string, lastname: string) {
        return this.findOne({ firstname, lastname })
    }
}