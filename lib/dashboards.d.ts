/// <reference path="../typings/index.d.ts" />
import * as common from "./common";
import { ObjectID } from 'mongodb';
export declare type MetadataType = "sources" | "options";
export declare let getAllByUser: (userId: string, callback: common.StandardCallback<common.Dashboard[]>) => void;
export declare let resetAccessToken: (dashboardId: ObjectID, cb: common.StandardCallback<common.Dashboard>) => void;
export declare let create: (userId: string, name: string, cb: common.ErrorCallback) => void;
export declare let updateMetadata: (userId: string, dashboardId: string, metadataType: "sources" | "options", sourceName: string, data: any, cb: common.ErrorCallback) => void;
export declare let findByAccessToken: (accessToken: string, cb: common.StandardCallback<common.Dashboard>) => void;
export declare let getSourceAuthInfoAndConfigFromDashboardAccessToken: (dashboard: common.Dashboard, authKeyName: string, cb: Function) => void;
