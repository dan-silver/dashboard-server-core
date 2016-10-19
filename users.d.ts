import { StandardCallback, ErrorCallback, User } from "./common";
export declare let getAuthScopes: (userId: string, cb: StandardCallback<string[]>) => void;
export declare let find: (authServiceName: string, authServiceId: string, callback: StandardCallback<User>) => void;
export declare let create: (user: User, cb: StandardCallback<string>) => void;
export declare let updateAuthScopes: (userId: string, authServiceName: string, scopes: string[], callback: ErrorCallback) => void;
export declare let updateAuthInfo: (userId: string, authServiceName: string, authInfo: any, callback: StandardCallback<User>) => void;
export declare let removeAuthInfo: (userId: string, authServiceName: string, callback: StandardCallback<User>) => void;
