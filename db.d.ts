/// <reference path="typings/index.d.ts" />
import * as mongo from 'mongodb';
export declare module db {
    interface DbCallback {
        (db: mongo.Db): void;
    }
    function get(callback: DbCallback): void;
}
