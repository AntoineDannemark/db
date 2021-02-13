import { createConnection, getRepository, getCustomRepository, Entity } from 'typeorm';
import { PersonRepository } from "./repository/PersonRepository";
// import { Tenant } from './entity/Tenant';
import tenantHandlers from './handlers/tenants';
import peopleHandlers from './handlers/people';
import { Person } from './entity/Person';
import { Address } from './entity/Address';
import { Phone } from './entity/Phone';
import { isObjectLiteralElement } from 'typescript';

type platform = "sqlite" | "cordova"

const initDB = async(platform: platform) => {
    return await createConnection({
        type: platform,
        database: "ioreel.db",
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [Person, Address, Phone],
    }).then(async connection => {
        const personRepository = getCustomRepository(PersonRepository); 
        const peopleCount = await personRepository.count()

        if (!peopleCount) await createJohnDoe()
        
        const john = await personRepository.findByName('john', 'doe'); // same as const user = new User();

        console.log('---------------------------')
        console.log(john)
        console.log('---------------------------')

        return {
            dbReady: connection.isConnected,
            error: null,
        }
    }).catch(err => {
        return {
            dbReady: false,
            error: err,
        }
    })
}

const getMethods = (obj: any) => Object.getOwnPropertyNames(obj).filter(item => item !== 'constructor' && typeof obj[item] === 'function') 

const generateApi = async function(repository: any =  PersonRepository) {
    let repo = Object.getPrototypeOf(getCustomRepository(repository))
    // let repo = getCustomRepository(repository)
    const methods = await getMethods(repo);

    console.log('----- METHODS -----')
    console.log(methods)
    console.log('---------')
   

    let api: any = {};

    for (const method in methods) {
        let nextApi = {
            ...api,
            [method]: async() => {
                return await repo[method]()
            },
        }

        api = nextApi;
    };

    console.log('----- API -----')
    console.log(api)
    console.log('---------')

    return JSON.stringify(api);
}

const api = {
    initDB,
    generateApi,
    /*

    TODO - if possible, 

    => generate the functions programmatically by looping over the repo's methods
    after all we're only passing through the typed arguments, and awaiting the homonym's call on the appropriate repo
    
    Imagine something like:
    
    const getEntityCustomRepo = Entity => CustomRepo;
  
    const generateApi = CustomRepo => CustomApi;

    api: {
        person: generateApi(getEntityCustomRepo(Person)),
        (...)
    }
    
    */
    person: {
        findByName: async(firstname: string, lastname: string) => {
            const personRepository = getCustomRepository(PersonRepository); 
            return await personRepository.findByName(firstname, lastname)
        },
        addPhone: async(
            id: number, 
            phone: {
                prefix: number, 
                number: number
            }
        ) => {
            const personRepository = getCustomRepository(PersonRepository);
            return await personRepository.addPhone(id, phone)
        },
        addAddress: async (
            id: number,
            address: {
                street: string,
                number: number,
                city: string,
                zip: number,
                country: string; 
            }
        ) => {
            const personRepository = getCustomRepository(PersonRepository);
            return await personRepository.addAddress(id, address);
        },
    },
    ...tenantHandlers,
    ...peopleHandlers,
}

export type Api = typeof api;

export default api;

const createJohnDoe = async () => {
    console.log('/*/*/*/* CREATE JOHN DOE')
    const personRepository = getCustomRepository(PersonRepository); 
    const phoneRepository = getRepository(Phone);
    const addressRepository = getRepository(Address);
    
    const phone = phoneRepository.create({
        prefix: 32,
        number: 670400
    })

    await phoneRepository.save(phone)
    console.log('/*/*/*/* SAVE PHONE')
    const address = addressRepository.create({
        street: "Rue Antoine",
        number: 76,
        city: "Waimes que j'aime",
        zip: 4950,
        country: "bellegicle",
    })
    
    await addressRepository.save(address)
    console.log('/*/*/*/* SAVE ADDRESS')
    const person = personRepository.create({
        firstname: "john",
        lastname: "doe",
        // LOL the date saved is 1984-11-16T23:00:00.000Z
        birthDate: new Date(1984, 10, 17).toISOString(),
        birthPlace: 'liège',
        email: 'john.doe@test.com',
        gender: 'm',
        bankAccount: 'BE674567321564',
        bankCode: 'BBRUEB',
        phones: [phone],
        addresses: [address]
    })

    await personRepository.save(person)
    console.log('/*/*/*/* SAVE JOHN')
}
