import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Person } from '../entity/Person';
import { Phone } from '../entity/Phone';
import { PhoneRepository } from './PhoneRepository';

@EntityRepository(Person) 
export class PersonRepository extends Repository<Person> {
    findByName(firstname: string, lastname: string) {
        return this.findOne({ firstname, lastname })
    }

    async addPhone(id: number, phone: {prefix: number, number: number}) {
        const phoneRepository = getCustomRepository(PhoneRepository); 
        const user = await this.findOne({ id });
        const newPhone = new Phone();
        newPhone.prefix = phone.prefix;
        newPhone.number = phone.number;
        await phoneRepository.save(newPhone);
        user.phones.push(newPhone);
        await this.save(user);
        return true;
    }

    // addAddress() {}
}