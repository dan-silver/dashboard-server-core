import * as _db from "./db";
import * as _users from "./users";
import * as _dashboards from "./dashboards";
import * as _common from "./common"

export module foo {
  export let users = _users;
}

export module fooCommon {
  export let common = _common;
}
