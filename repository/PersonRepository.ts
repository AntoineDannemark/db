import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
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
        const user = await this.findOne({ id });
        if (user) {
            console.log('---- User -----')
            console.log(user)
            console.log('---- User phones -----')
            console.log(user.phones)
            const newPhone = new Phone();
            newPhone.prefix = phone.prefix;
            newPhone.number = phone.number;
            await phoneRepository.save(newPhone);
            user.phones.push(newPhone);
            await this.save(user);
            return true;
        } else {
            return false
        }
    }

    // addAddress() {}
}