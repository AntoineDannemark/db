import { PeopleController } from './../controllers/PeopleController';
import { getConnection } from 'typeorm';
import { People } from '../entities/People';

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


const updatePerson = async(id: string, { firstname, lastname, email }: personData) => {
    return await getConnection()
        .createQueryBuilder()
        .update(People)
        .set({ firstname, lastname, email })
        .where("id = :id", { id })
        .execute()
}

const deletePerson = async(id: string) => {
    return await getConnection()
        .createQueryBuilder()
        .softDelete()
        .from(People, "person")
        .where("person.id = :id", { id })
        .execute();
};

export default {
    fetchPeople,
    createPerson,
    updatePerson,
    deletePerson,
}