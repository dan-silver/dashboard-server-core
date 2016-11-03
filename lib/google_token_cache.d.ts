/// <reference path="../typings/index.d.ts" />
import * as common from "./common";
export declare function init(_GOOGLE_CLIENT_ID: string, _GOOGLE_CLIENT_SECRET: string): void;
export declare function getGoogleAccessToken(userId: string, callback: common.StandardCallback<string>): void;
export declare function getGoogleAccessTokenFromRefreshToken(userId: string, callback: common.StandardCallback<string>): void;
export declare function setAccessToken(userId: string, authServiceName: string, accessToken: string, expiresAt?: Date): void;
