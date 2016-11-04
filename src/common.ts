/// <reference path="../typings/index.d.ts" />

import {ObjectID} from 'mongodb';

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


// must export in main.ts
export const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/social-dash"
export const DASH_DATA_URL = process.env.DASH_DATA_URL || "http://localhost:4000"
export const DASH_VIEW_URL = process.env.DASH_VIEW_URL || "http://localhost:5000"