/// <reference path="../typings/index.d.ts" />

import * as mongo from 'mongodb'
import {MONGO_URL} from "./common"

export interface DbCallback {
  (db: mongo.Db):void;
}

export function get(callback:DbCallback):void {
  mongo.MongoClient.connect(MONGO_URL, (err, db) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(db);
  });
}