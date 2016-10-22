/// <reference path="typings/index.d.ts" />
import * as common from "./common";
import { ObjectID } from 'mongodb';
export declare module dashboards {
    type MetadataType = "sources" | "options";
    let getAllByUser: (userId: string, callback: common.StandardCallback<common.Dashboard[]>) => void;
    let resetAccessToken: (dashboardId: ObjectID, cb: common.StandardCallback<common.Dashboard>) => void;
    let create: (userId: string, name: string, cb: common.ErrorCallback) => void;
    let updateMetadata: (userId: string, dashboardId: string, metadataType: "sources" | "options", sourceName: string, data: any, cb: common.ErrorCallback) => void;
    let findByAccessToken: (accessToken: string, cb: common.StandardCallback<common.Dashboard>) => void;
    let getSourceAuthInfoAndConfigFromDashboardAccessToken: (dashboard: common.Dashboard, authKeyName: string, cb: Function) => void;
}
