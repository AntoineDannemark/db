import create from './actions/create';
import fetchAll from './actions/fetchAll';
import updateOne from './actions/updateOne';
import softDelete from './actions/softDelete';
import addPhone from './actions/addPhone';
import addAddress from './actions/addAddress';

export { Person } from './Person';
export type { IPerson } from './Person';

export default {
    create, 
    fetchAll,
    updateOne,
    softDelete,
    addPhone,
    addAddress,
}