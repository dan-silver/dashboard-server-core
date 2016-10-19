/// <reference path="typings/index.d.ts" />

import {StandardCallback, ErrorCallback, User} from "./common"

import * as db from "./db";

import {ObjectID} from 'mongodb';

let findById = (userId:string, callback:StandardCallback<User>) => {
  db.get((db) => {
    db.collection('users').find({_id: new ObjectID(userId)}).toArray(function(err, user) {
      callback(err, user[0]);
      db.close();
   });
  });
};


export let getAuthScopes = (userId:string, cb:StandardCallback<string[]>) => {
  findById(userId, (err, user) => {
      var allScopes:string[] = [];

      for (var source in user.auth) {
        var authSource = user.auth[source];
        allScopes = allScopes.concat(authSource.scopes);
      }

      cb(err, allScopes);
  })
}


export let find = (authServiceName:string, authServiceId:string, callback:StandardCallback<User>) => {
  db.get((db) => {
    var pathToId = "auth." + authServiceName + ".id";
    var query:{ [id: string] : string; }  = {};
    query[pathToId] = authServiceId;
    db.collection('users').find(query).toArray(function(err, user) {
      callback(err, user[0]);
      db.close();
   });
  });
};

let create = (user:User, cb:StandardCallback<string>) => {
  db.get((db) => {
    db.collection('users').insert(user, (err, docInserted) => {
        cb(err, docInserted.insertedId.toString());
        db.close();
    });
  });
}

export let updateAuthScopes = (userId:string, authServiceName:string, scopes:string[], callback:ErrorCallback) => {
  var authInfoPath = "auth." + authServiceName + ".scopes";
  let updateObj:{ [id: string] : any; }  = {};
  updateObj[authInfoPath] = {$each: scopes};


  db.get((db) => {
    db.collection('users').update({
      _id: new ObjectID(userId)
    },{
      $addToSet: updateObj,
    }, function(err) {
      callback(err);
    });
  });
}


export let updateAuthInfo = (userId:string, authServiceName:string, authInfo:any, callback:StandardCallback<User>) => {
  var authInfoPath = "auth." + authServiceName;
  var updateObj:{ [id: string] : string; }  = {};
  updateObj[authInfoPath] = authInfo;


  db.get((db) => {
    db.collection('users').update({
      _id: new ObjectID(userId)
    },{
      $set: updateObj,
    }, function(err) {
      if (err) {
        callback(err);
        return;
      }
      findById(userId, (err, user) => {
        callback(err, user);
      });
    });

  });
}

export let removeAuthInfo = (userId:string, authServiceName:string, callback:StandardCallback<User>) => {
  var authInfoPath = "auth." + authServiceName;
  var updateObj:{ [id: string] : any; }  = {};
  updateObj[authInfoPath] = {};

  db.get((db) => {
    db.collection('users').update({
      _id: new ObjectID(userId)
    },{
      $unset: updateObj,
    }, function(err) {
      if (err) {
        callback(err);
        return;
      }

      findById(userId, (err, user) => {
        callback(err, user);
      });
    });

  });
}