/// <reference path="../typings/index.d.ts" />

"use strict";

const google = require('googleapis');

var OAuth2 = google.auth.OAuth2;

export function create(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, access_token?, refresh_token?) {
    var oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL);


    if (access_token != null) {
        // Retrieve tokens via token exchange explained above or set them:
        oauth2Client.setCredentials({
            access_token: access_token,
            refresh_token: refresh_token
        });
    }


    return oauth2Client;
}