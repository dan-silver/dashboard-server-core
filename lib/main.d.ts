import * as _db from "./db";
import * as _users from "./users";
import * as _dashboards from "./dashboards";
import * as _common from "./common";
export default class foo {
    static users: typeof _users;
    static dashboards: typeof _dashboards;
    static db: typeof _db;
    static common: typeof _common;
}
