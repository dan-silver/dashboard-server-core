import { ObjectID } from 'mongodb';
export declare module common {
    interface StandardCallback<T> {
        (err: any, data?: T): void;
    }
    interface ErrorCallback {
        (err: any): void;
    }
    interface User {
        _id: ObjectID;
        displayName: string;
        auth: {
            [serviceName: string]: any;
        };
    }
    interface Dashboard {
        _id: ObjectID;
        name: string;
        userIds: [ObjectID];
        auth: {
            [sourceName: string]: any;
        };
    }
    type SourceNames = "TWITTER" | "WEATHER" | "YOUTUBE" | "GOOGLE_CALENDAR";
}
