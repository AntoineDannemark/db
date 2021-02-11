import { 
    EntityRepository, 
    getCustomRepository, 
    Repository 
} from 'typeorm';
import { Person } from '../entity/Person';
import { Phone } from '../entity/Phone';
import { Address } from '../entity/Address';
import { PhoneRepository } from './PhoneRepository';
import { AddressRepository } from './AddressRepository';


@EntityRepository(Person) 
export class PersonRepository extends Repository<Person> {
    findByName(firstname: string, lastname: string) {
        return this.findOne({where: { firstname, lastname }, relations: ['phones', 'addresses'] })
    }

    async addPhone(
        id: number, 
        phone: {
            prefix: number, 
            number: number
    }) {
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

    async addAddress(
        id: number, 
        address: {
            street: string,
            number: number, 
            city: string,
            zip: number,
            country: string,

    }) {
        const addressRepository = getCustomRepository(AddressRepository);
        const person = await this.findOne({ where: { id }, relations: ['addresses'] });

        if (person) {
            const {
                street, 
                number,
                city,
                zip,
                country,
            } = address,
                newAddress = new Address();

            newAddress.street = street;
            newAddress.number = number;
            newAddress.city = city;
            newAddress.zip = zip;
            newAddress.country = country;
        
            await addressRepository.save(newAddress);
        
            person.addresses.push(newAddress);
        
            await this.save(person);
        
            return true;
        } else {
            return false
        }
    }
}