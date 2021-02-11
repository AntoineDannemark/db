import { EntityRepository, Repository } from 'typeorm';
// import { Person } from '../entity/Person';
import { Phone } from '../entity/Phone';

@EntityRepository(Phone) 
export class PhoneRepository extends Repository<Phone> {
    // findByName(firstname: string, lastname: string) {
    //     return this.findOne({ firstname, lastname })
    // }

    // async addPhone(id: number, phone: {prefix: number, number: number}) {
    //     const user = await this.findOne({ id });
    //     const newPhone = new Phone();
    //     newPhone.prefix = phone.prefix;
    //     newPhone.number = phone.number;
    //     await 
    //     user.phones.push(newPhone);
    // }

    // addAddress() {}
}