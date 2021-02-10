import { getManager } from 'typeorm'
import { People } from '../entities/People'
import { validate } from 'class-validator'

interface peopleDetails {
    firstname: string;
    lastname: string;
    email: string;
}

export class PeopleController {
    async create(peopleDetails: peopleDetails): Promise<People> {
        const { firstname, lastname, email } = peopleDetails
        let people = new People();
        people.firstname = firstname;
        people.lastname = lastname;
        people.email = email;

        const errors = await validate(people)
        if (errors.length > 0) {                        
            throw new Error('validation failed')
        } else {
            await getManager().save(people)
        }

        return people
    }
    getAll() {
        return getManager().find(People);
    }
}
