import { 
    EntityRepository, 
    getCustomRepository, 
    Repository 
} from 'typeorm';
import { Person } from '../entity/Person';
import { Phone } from '../entity/Phone';
import { PhoneRepository } from './PhoneRepository';

@EntityRepository(Person) 
export class PersonRepository extends Repository<Person> {
    findByName(firstname: string, lastname: string) {
        return this.findOne({where: { firstname, lastname }, relations: ['phones', 'addresses'] })
    }

    async addPhone(id: number, phone: {prefix: number, number: number}) {
        const phoneRepository = getCustomRepository(PhoneRepository); 
        const person = await this.findOne({ where: { id }, relations: ['phones'] });

        if (person) {
            const newPhone = new Phone();
            newPhone.prefix = phone.prefix;
            newPhone.number = phone.number;
            await phoneRepository.save(newPhone);
            person.phones.push(newPhone);
            await this.save(person);
            return true;
        } else {
            return false
        }
    }

    // addAddress() {}
}