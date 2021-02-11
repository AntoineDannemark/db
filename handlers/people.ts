import { PeopleController } from './../controllers/PeopleController';
import { getConnection } from 'typeorm';
import { Person } from '../entity/Person';

let controller = new PeopleController()

// const fetchPeople = async() => {
//     return await getConnection()
//         .createQueryBuilder()
//         .select("id, firstname, lastname, email")
//         .from(People, "people")
//         .execute()
// }

const fetchPeople = () => controller.getAll()

interface personData {
    firstname: string; 
    lastname: string;
    email: string;
}

// const createPerson = async(person: personData) => {
//     return await getConnection()
//         .createQueryBuilder()
//         .insert()
//         .into(People)
//         .values(person)
//         .execute()
// };

const createPerson = (person: personData) => controller.create(person)


const updatePerson = async(id: number, { firstname, lastname, email }: personData) => {
    return await getConnection()
        .createQueryBuilder()
        .update(Person)
        .set({ firstname, lastname, email })
        .where("id = :id", { id })
        .execute()
}

const deletePerson = async(id: number) => {
    return await getConnection()
        .createQueryBuilder()
        .softDelete()
        .from(Person, "person")
        .where("person.id = :id", { id })
        .execute();
};

export default {
    fetchPeople,
    createPerson,
    updatePerson,
    deletePerson,
}