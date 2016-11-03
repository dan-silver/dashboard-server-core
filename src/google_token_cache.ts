/// <reference path="../typings/index.d.ts" />

var ObjectId = require('mongodb').ObjectID;
var request = require('superagent');

import  * as common from "./common"
import * as users from "./users"

import {ObjectID} from 'mongodb';


/*
 {
    userId: {
      authServiceName: {
        accessToken: 
        expiresAt: Absolute date 
      }
    }
*/

interface TokenCache {
  [userId:string]: {
      [serviceName:string]: {
          accessToken: string,
          expiresAt: Date
      }
  }
}

let cache:TokenCache = {};

let GOOGLE_CLIENT_ID:string = null;
let GOOGLE_CLIENT_SECRET:string = null;

export function init(_GOOGLE_CLIENT_ID: string, _GOOGLE_CLIENT_SECRET:string) {
  GOOGLE_CLIENT_ID = _GOOGLE_CLIENT_ID;
  GOOGLE_CLIENT_SECRET = _GOOGLE_CLIENT_SECRET;
}


export function getGoogleAccessToken(userId:ObjectID, callback:common.StandardCallback<string>) {
  let id=userId.toString();
  if (id in cache && "google" in cache[id]) {
    let authInfo = cache[id]["google"]
    if (authInfo.expiresAt > new Date((new Date()).getTime() + 5*60000)) { //expires at least 5 minutes from now
      callback(null, authInfo.accessToken);
      return;
    }
  }


  getGoogleAccessTokenFromRefreshToken(userId, callback);

}


export function getGoogleAccessTokenFromRefreshToken(userId:ObjectID, callback:common.StandardCallback<string>) {
  if (GOOGLE_CLIENT_ID == null) {
    callback({err: 'GOOGLE_CLIENT_ID not set'});
    return;
  }

  users.findById(userId, (err, user)=> {

    const userGoogleAuthInfo = user.auth["google"];
    let refreshToken = userGoogleAuthInfo.refreshToken;

    request
      .post('https://www.googleapis.com/oauth2/v4/token')
      .type('form')
      .send({
        client_id: GOOGLE_CLIENT_ID,
        grant_type: "refresh_token",
        client_secret: GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken
      })
      .end(function(err:any, res:any) {
        const access_token = res.body.access_token;

        // save to cache
        setAccessToken(userId, "google", access_token, new Date((new Date()).getTime() + res.body.expires_in * 1000));

        if (err) {
          callback(err)
        } else {
          callback(null, res.body.access_token);
        }
        // Calling the end function will send the request
      });
  })

}

export function setAccessToken(userId:ObjectID, authServiceName:string, accessToken:string, expiresAt?:Date) {
  let id = userId.toString();
  cache[id] = cache[id] || {};
  cache[id][authServiceName] = {
    accessToken: accessToken,
    expiresAt: expiresAt ? expiresAt : new Date((new Date()).getTime() + 1800 * 1000) //if no expiresAt, set +30min
  }
}