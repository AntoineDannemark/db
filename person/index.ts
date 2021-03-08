import create from './actions/create';
import fetchAll from './actions/fetchAll';
import addPhone from './actions/addPhone';
import addAddress from './actions/addAddress';

export { Person } from './Person';
export type { IPerson } from './Person';

export default {
    // All routes here
    create, 
    fetchAll,
    addPhone,
    addAddress,
}