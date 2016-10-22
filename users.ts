import {db} from "./db";
import {common} from "./common"
import {ObjectID} from 'mongodb';


export module users {
  export let findById = (userId:string, callback:common.StandardCallback<common.User>) => {
    db.get((db) => {
      db.collection('users').find({_id: new ObjectID(userId)}).toArray((err, user) => {
        callback(err, user[0]);
        db.close();
    });
    });
  };


  export let getAuthScopes = (userId:string, cb:common.StandardCallback<string[]>) => {
    findById(userId, (err, user) => {
        var allScopes:string[] = [];

        for (var source in user.auth) {
          var authSource = user.auth[source];
          allScopes = allScopes.concat(authSource.scopes);
        }

        cb(err, allScopes);
    })
  }


  export let find = (authServiceName:string, authServiceId:string, callback:common.StandardCallback<common.User>) => {
    db.get((db) => {
      var pathToId = "auth." + authServiceName + ".id";
      var query:{ [id: string] : string; }  = {};
      query[pathToId] = authServiceId;
      db.collection('users').find(query).toArray((err, user) => {
        callback(err, user[0]);
        db.close();
    });
    });
  };

  export let create = (user:common.User, cb:common.StandardCallback<string>) => {
    db.get((db) => {
      db.collection('users').insert(user, (err:any, docInserted:any) => {
          cb(err, docInserted.insertedIds[0].toString());
          db.close();
      });
    });
  }

  export let updateAuthScopes = (userId:string, authServiceName:string, scopes:string[], callback:common.ErrorCallback) => {
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


  export let updateAuthInfo = (userId:string, authServiceName:string, authInfo:any, callback:common.StandardCallback<common.User>) => {
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

  export let removeAuthInfo = (userId:string, authServiceName:string, callback:common.StandardCallback<common.User>) => {
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
}