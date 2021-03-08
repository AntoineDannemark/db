import create from './actions/create';
import softDelete from './actions/softDelete';
import fetchAll from './actions/fetchAll';
import addPhone from './actions/addPhone';
import addAddress from './actions/addAddress';

export { Person } from './Person';
export type { IPerson } from './Person';

export default {
    // All routes here
    create, 
    softDelete,
    fetchAll,
    addPhone,
    addAddress,
}