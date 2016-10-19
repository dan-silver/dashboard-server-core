/// <reference path="typings/index.d.ts" />

import {StandardCallback, ErrorCallback, Dashboard} from "./common"
import * as db from "./db";

import {ObjectID} from 'mongodb';

import {randomBytes} from 'crypto';

var defaults = require('social-dashboard-core')
type MetadataType = "sources" | "options"; 

export let getAllByUser = (userId:string, callback:StandardCallback<Dashboard[]>) => {
  if (!userId) {
    debugger;
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
  return {
    TWITTER: {
      version: defaults.sources.TWITTER.version,
			active: defaults.sources.TWITTER.enabledByDefault,
			data: defaults.sources.TWITTER.defaultData,
      // position: "left-column"
		},
		WEATHER: {
      version: defaults.sources.WEATHER.version,
			active: defaults.sources.WEATHER.enabledByDefault,
			data: defaults.sources.WEATHER.defaultData,
      // position: "right-column"
		},
		YOUTUBE: {
      version: defaults.sources.YOUTUBE.version,
			active: defaults.sources.YOUTUBE.enabledByDefault,
			data: defaults.sources.YOUTUBE.defaultData,
      // position: "middle-column"
		},
		GOOGLE_CALENDAR: {
      version: defaults.sources.GOOGLE_CALENDAR.version,
			active: defaults.sources.GOOGLE_CALENDAR.enabledByDefault,
			data: defaults.sources.GOOGLE_CALENDAR.defaultData,
      // position: "middle-column"
		}
  }
}

function getDefaultOptions() {
  return {
    BACKGROUND: {
      version: defaults.options.BACKGROUND.version,
      data: {
        type: defaults.options.BACKGROUND.options.SLIDESHOW.value,
        imageURL: defaults.options.BACKGROUND.options.IMAGE_URL.default,
        color: defaults.options.BACKGROUND.options.COLOR.default,
        slideshowSpeed: defaults.options.BACKGROUND.options.SLIDESHOW.speed
      }
    }
    // , LAYOUT: {
    //   version: defaults.options.LAYOUT.version,
    //   data: {
    //     layout: "3-col",
    //     version: 1
    //   }
    // }

  };
}

function generateAccessToken(cb:StandardCallback<string>) {
    randomBytes(128, (err, buffer) => {
      const accessToken = buffer.toString('hex');
      cb(err, accessToken);
    })
}

export let resetAccessToken = (dashboardId:ObjectID, cb: StandardCallback<Dashboard>) => {
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

export let create = (userId:string, name:string, cb:ErrorCallback) => {
  db.get((db) => {
    generateAccessToken((err, accessToken) => {
      db.collection('dashboards').insertOne({
          name: name,
          userIds: [new ObjectID(userId)],
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


export let updateMetadata = (userId:string, dashboardId:string, metadataType:MetadataType, sourceName:string, data:any, cb:ErrorCallback) => {
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

export let findByAccessToken = (accessToken:string, cb:StandardCallback<Dashboard>) => {
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
export let getSourceAuthInfoAndConfigFromDashboardAccessToken = (dashboard:Dashboard, authKeyName:string, cb:Function) => {
  if (dashboard === undefined) cb()

  db.get((db) => {
    var userId = dashboard.userIds[0];
    db.collection('users').find({_id:userId}).toArray((err, users) => {
      cb(users[0].auth[authKeyName]);
      db.close();
    });
  })
}