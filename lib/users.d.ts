/// <reference path="../typings/index.d.ts" />
import * as common from "./common";
import { ObjectID } from 'mongodb';
export declare let findById: (userId: ObjectID, callback: common.StandardCallback<common.User>) => void;
export declare let getAuthScopes: (userId: ObjectID, cb: common.StandardCallback<string[]>) => void;
export declare let find: (authServiceName: string, authServiceId: string, callback: common.StandardCallback<common.User>) => void;
export declare let create: (user: common.User, cb: common.StandardCallback<ObjectID>) => void;
export declare let updateAuthScopes: (userId: ObjectID, authServiceName: string, scopes: string[], callback: common.ErrorCallback) => void;
export declare let updateAuthInfo: (userId: ObjectID, authServiceName: string, authInfo: any, callback: common.StandardCallback<common.User>) => void;
export declare let removeAuthInfo: (userId: ObjectID, authServiceName: string, callback: common.StandardCallback<common.User>) => void;
