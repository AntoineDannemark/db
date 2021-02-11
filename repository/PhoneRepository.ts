import { EntityRepository, Repository } from 'typeorm';
import { Phone } from '../entity/Phone';

@EntityRepository(Phone) 
export class PhoneRepository extends Repository<Phone> {
    // Define custom Phone functions here
}