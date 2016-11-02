/// <reference path="../typings/index.d.ts" />

// let url = 'mongodb://localhost:4321/social-dash';


import * as mongo from 'mongodb'

export interface DbCallback {
  (db: mongo.Db):void;
}

export function get(callback:DbCallback):void {
  mongo.MongoClient.connect(process.env.MONGO_URL, (err, db) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(db);
  });
}