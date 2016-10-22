import * as _db from "./db";
import * as _users from "./users";
import * as _dashboards from "./dashboards";
import * as _common from "./common"

export default class foo {
  static users = _users;
  static dashboards = _dashboards;
  static db = _db;
  static common = _common;
}
