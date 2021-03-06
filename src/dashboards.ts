import * as common from "./common"

import * as db from "./db";

import {ObjectID} from 'mongodb';
import {randomBytes} from 'crypto';

const defaults = require('social-dashboard-core')

export type MetadataType = "sources" | "options"; 

export let getAllByUser = (userId:string, callback:common.StandardCallback<common.Dashboard[]>) => {
  if (!userId) {
    callback("no userId provided in getAllByUser()");
    return;
  }
  db.get((db) => {
    db.collection('dashboards').find({"userIds": {"$in": [new ObjectID(userId)]}}).toArray((err, dashboards) => {
      callback(err, dashboards);
      db.close();
    })
  })
}

function getDefaultSources() {
  let sourcesToEnable:common.SourceNames[] = [
    "TWITTER",
    "WEATHER",
    "GOOGLE_CALENDAR",
    "YOUTUBE",
    "COUNTDOWN",
    "RSS",
    "CLOCK"
  ];

  let sourceObj: { [id: string] : any; }  = {};
  for (let sourceName of sourcesToEnable) {
    sourceObj[sourceName] = {
      version: defaults.sources[sourceName].version,
      active: defaults.sources[sourceName].enabledByDefault,
      data: defaults.sources[sourceName].defaultData
    }
  }

  return sourceObj;
}

function getDefaultOptions() {
  let optionsToEnable:string[] = [
    "BACKGROUND",
    "THEME",
    "CARDS"
  ];

  let optionObj: { [id: string] : any; }  = {};
  for (let optionName of optionsToEnable) {
    optionObj[optionName] = {
      version: defaults.options[optionName].version,
      data: defaults.options[optionName].defaultData
    }
  }
  return optionObj;
}

function generateAccessToken(cb:common.StandardCallback<string>) {
    randomBytes(128, (err, buffer) => {
      const accessToken = buffer.toString('hex');
      cb(err, accessToken);
    })
}

export let resetAccessToken = (dashboardId:ObjectID, cb: common.StandardCallback<common.Dashboard>) => {
  generateAccessToken((err, accessToken) => {
    db.get((db) => {
      db.collection('dashboards').update(
        {
          _id: dashboardId
        },
        {
          $set:{accessToken: accessToken},
        },
        {},
        function(err) {
            db.close();
            cb(err);
        }
      );
    })
  });
}

export let create = (userId:ObjectID, name:string, cb:common.ErrorCallback) => {
  db.get((db) => {
    generateAccessToken((err, accessToken) => {
      db.collection('dashboards').insertOne({
          name: name,
          userIds: [userId],
          sources: getDefaultSources(),
          options: getDefaultOptions(),
          accessToken: accessToken
      }, (err, result) => {
        db.close();
        cb(err);
      });
    });
  });
}

// dashboard metadata types
  // sources (TWITTER)
  // options (BACKGROUND)


export let updateMetadata = (userId:string, dashboardId:string, metadataType:MetadataType, sourceName:string, data:any, cb:common.ErrorCallback) => {
  // @todo make sure user owns dashboard!
  const pathToSourceActive = metadataType + "." + sourceName;
  interface SourceUpdateObj {
      [key: string]: string;
  }

  let updateObject:SourceUpdateObj = {};
  updateObject[pathToSourceActive] = data;

  db.get((db) => {
    // make sure sources is in the dashboards set
    
    db.collection('dashboards').update(
      {
        _id: new ObjectID(dashboardId)
      },
      {
        $set:updateObject,
        $addToSet:{userIds:new ObjectID(userId)},
      },
      {},
      function(err) {
          db.close();
          cb(err);
      }
    );

  })
}

export let findByAccessToken = (accessToken:string, cb:common.StandardCallback<common.Dashboard>) => {
  db.get((db) => {
    db.collection('dashboards').find({"accessToken": {"$in": [accessToken]}}).toArray((err, dashboards) => {
      if (dashboards.length == 0) {
        cb(err, null)
      } else {
        cb(err, dashboards[0]);
      }
      db.close();
    })
  })
}


// given a dashboard accessToken, get the userId, then the accessToken for the source
export let getSourceAuthInfoAndConfigFromDashboardAccessToken = (dashboard:common.Dashboard, authKeyName:string, cb:Function) => {
  if (dashboard === undefined) cb()

  db.get((db) => {
    var userId = dashboard.userIds[0];
    db.collection('users').find({_id:userId}).toArray((err, users) => {
      cb(users[0].auth[authKeyName]);
      db.close();
    });
  })
}