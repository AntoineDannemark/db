import create from './actions/create';
import softDelete from './actions/softDelete';
import fetchAll from './actions/fetchAll';

export { Address } from './Address';
export type { IAddress } from './Address';

export default {
    // All routes here
    create, 
    softDelete,
    fetchAll,
}