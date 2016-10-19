import * as mongo from 'mongodb';
export interface DbCallback {
    (db: mongo.Db): void;
}
export declare let get: (callback: DbCallback) => void;
