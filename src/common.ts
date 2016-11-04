/// <reference path="../typings/index.d.ts" />

import {ObjectID} from 'mongodb';
const defaults = require('social-dashboard-core')

export interface StandardCallback<T> {
  (err:any, data?:T):void;
}

export interface ErrorCallback {
  (err:any):void;  
}

export interface User {
  _id?: string
  displayName: string
  auth: { [serviceName: string] : any; }
}

export interface Dashboard {
  _id: ObjectID
  name: string
  userIds: [ObjectID]
  auth: { [sourceName: string] : any; }
}

export type SourceNames =
  "TWITTER" |
  "WEATHER" |
  "YOUTUBE"|
  "GOOGLE_CALENDAR" |
  "COUNTDOWN" |
  "RSS" |
  "CLOCK";

let URL = process.env.DOCKERCLOUD_SERVICE_HOSTNAME ? defaults.URL.PROD : defaults.URL.DEV;

export const MONGO_URL = URL.MONGO;
export const DASH_DATA_URL = URL.DASH_DATA;
export const DASH_VIEW_URL = URL.DASH_VIEW;