import * as mongo from 'mongodb';
export interface DbCallback {
    (db: mongo.Db): void;
}
export declare function get(callback: DbCallback): void;
