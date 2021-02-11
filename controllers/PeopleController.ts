import { getManager } from 'typeorm'
import { Person } from '../entity/Person'
import { validate } from 'class-validator'

interface peopleDetails {
    firstname: string;
    lastname: string;
    email: string;
}

export class PeopleController {
    async create(peopleDetails: peopleDetails): Promise<Person> {
        const { firstname, lastname, email } = peopleDetails
        let people = new Person();
        people.firstname = firstname;
        people.lastname = lastname;
        people.email = email;

        const errors = await validate(people)
        if (errors.length > 0) {                        
            throw new Error('validation failed')
        } else {
            await getManager().save(people)
        }

        console.log(people)

        return people
    }
    getAll() {
        return getManager().find(Person);
    }
}
