import * as _db from "./db";
import * as _users from "./users";
import * as _dashboards from "./dashboards";
import * as _common from "./common";
export declare module serverCore {
    let users: typeof _users;
    let dashboards: typeof _dashboards;
    let db: typeof _db;
    let common: typeof _common;
}
