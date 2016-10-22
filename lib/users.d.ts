/// <reference path="../typings/index.d.ts" />
import * as common from "./common";
export declare let findById: (userId: string, callback: common.StandardCallback<common.User>) => void;
export declare let getAuthScopes: (userId: string, cb: common.StandardCallback<string[]>) => void;
export declare let find: (authServiceName: string, authServiceId: string, callback: common.StandardCallback<common.User>) => void;
export declare let create: (user: common.User, cb: common.StandardCallback<string>) => void;
export declare let updateAuthScopes: (userId: string, authServiceName: string, scopes: string[], callback: common.ErrorCallback) => void;
export declare let updateAuthInfo: (userId: string, authServiceName: string, authInfo: any, callback: common.StandardCallback<common.User>) => void;
export declare let removeAuthInfo: (userId: string, authServiceName: string, callback: common.StandardCallback<common.User>) => void;
