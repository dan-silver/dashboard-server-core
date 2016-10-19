/// <reference path="../typings/index.d.ts" />

import * as mongo from 'mongodb';
const MongoClient = mongo.MongoClient;

var assert = require('assert');

const url = 'mongodb://localhost:27017/social-dash';

export interface DbCallback {
  (db: mongo.Db):void;
}

export let get = (callback:DbCallback) => {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    callback(db);
  });
}