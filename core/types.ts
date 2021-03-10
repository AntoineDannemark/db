import { DB_HOSTING } from './constants';

const { LOCAL, SLS } = DB_HOSTING;

export type DbHosting = typeof LOCAL | typeof SLS | undefined;
export type SlsEndpoint = string | undefined;
export type Endpoint = {
    dbHosting: DbHosting;
    slsEndpoint: SlsEndpoint;
};