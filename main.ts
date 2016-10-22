import * as _db from "./db";
import * as _users from "./users";
import * as _dashboards from "./dashboards";
import * as _common from "./common"

export module serverCore {
  export let users = _users;
  export let dashboards = _dashboards;
  export let db = _db;
  export let common = _common;
}