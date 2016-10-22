/// <reference path="./typings/index.d.ts" />

let url = 'mongodb://localhost:27017/social-dash';

import * as mongo from 'mongodb'

export interface DbCallback {
  (db: mongo.Db):void;
}

export function get(callback:DbCallback):void {
  mongo.MongoClient.connect(url, function(err, db) {
    callback(db);
  });
}