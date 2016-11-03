/// <reference path="../typings/index.d.ts" />
import * as common from "./common";
import { ObjectID } from 'mongodb';
export declare function init(_GOOGLE_CLIENT_ID: string, _GOOGLE_CLIENT_SECRET: string): void;
export declare function getGoogleAccessToken(userId: ObjectID, callback: common.StandardCallback<string>): void;
export declare function getGoogleAccessTokenFromRefreshToken(userId: ObjectID, callback: common.StandardCallback<string>): void;
export declare function setAccessToken(userId: ObjectID, authServiceName: string, accessToken: string, expiresAt?: Date): void;
