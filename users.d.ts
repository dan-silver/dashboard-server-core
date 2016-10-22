/// <reference path="typings/index.d.ts" />
import { common } from "./common";
export declare module users {
    let findById: (userId: string, callback: common.StandardCallback<common.User>) => void;
    let getAuthScopes: (userId: string, cb: common.StandardCallback<string[]>) => void;
    let find: (authServiceName: string, authServiceId: string, callback: common.StandardCallback<common.User>) => void;
    let create: (user: common.User, cb: common.StandardCallback<string>) => void;
    let updateAuthScopes: (userId: string, authServiceName: string, scopes: string[], callback: common.ErrorCallback) => void;
    let updateAuthInfo: (userId: string, authServiceName: string, authInfo: any, callback: common.StandardCallback<common.User>) => void;
    let removeAuthInfo: (userId: string, authServiceName: string, callback: common.StandardCallback<common.User>) => void;
}
