import { StandardCallback, ErrorCallback, Dashboard } from "./common";
import { ObjectID } from 'mongodb';
export declare type MetadataType = "sources" | "options";
export declare let getAllByUser: (userId: string, callback: StandardCallback<Dashboard[]>) => void;
export declare let resetAccessToken: (dashboardId: ObjectID, cb: StandardCallback<Dashboard>) => void;
export declare let create: (userId: string, name: string, cb: ErrorCallback) => void;
export declare let updateMetadata: (userId: string, dashboardId: string, metadataType: "sources" | "options", sourceName: string, data: any, cb: ErrorCallback) => void;
export declare let findByAccessToken: (accessToken: string, cb: StandardCallback<Dashboard>) => void;
export declare let getSourceAuthInfoAndConfigFromDashboardAccessToken: (dashboard: Dashboard, authKeyName: string, cb: Function) => void;
