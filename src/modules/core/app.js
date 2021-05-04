import { NativeModules } from 'react-native';

import { isObject } from '../../utils';
import APPS from '../../utils/apps';
import { SharedEventEmitter } from '../../utils/events';
import INTERNALS from '../../utils/internals';
import Notifications, {
    NAMESPACE as NotificationsNamespace,
} from '../notifications';
import Utils, { NAMESPACE as UtilsNamespace } from '../utils';

const FirebaseCoreModule = NativeModules.RNFirebase;

export default class App {

    _extendedProps;

    _initialized = false;

    _name;

    _nativeInitialized = false;

    _options;

    notifications;

    utils;

    constructor(
        name,
        options,
        fromNative = false,
    ) {
        this._name = name;
        this._options = { ...options };

        if (fromNative) {
            this._initialized = true;
            this._nativeInitialized = true;
        } else if (options.databaseURL && options.apiKey) {
            FirebaseCoreModule.initializeApp(
                this._name,
                this._options,
                (error, result) => {
                    this._initialized = true;
                    SharedEventEmitter.emit(`AppReady:${this._name}`, { error, result });
                },
            );
        }

        this.notifications = APPS.appModule(
            this,
            NotificationsNamespace,
            Notifications,
        );

        this.utils = APPS.appModule(this, UtilsNamespace, Utils);
        this._extendedProps = {};
    }

    /**
     *
     * @return {*}
    */
    get name() {
        return this._name;
    }

    /**
     *
     * @return {*}
     */
    get options() {
        return { ...this._options };
    }

    /**
     * Undocumented firebase web sdk method that allows adding additional properties onto
     * a firebase app instance.
     *
     * See: https://github.com/firebase/firebase-js-sdk/blob/master/tests/app/firebase_app.test.ts#L328
     *
     * @param props
     */
    extendApp(props) {
        if (!isObject(props)) {
            throw new Error(
                INTERNALS.STRINGS.ERROR_MISSING_ARG('Object', 'extendApp'),
            );
        }

        const keys = Object.keys(props);

        for (let i = 0, len = keys.length; i < len; i += 1) {
            const key = keys[i];

            if (!this._extendedProps[key] && Object.hasOwnProperty.call(this, key)) {
                throw new Error(INTERNALS.STRINGS.ERROR_PROTECTED_PROP(key));
            }

            // $FlowExpectedError: Flow doesn't support indexable signatures on classes: https://github.com/facebook/flow/issues/1323
            this[key] = props[key];
            this._extendedProps[key] = true;
        }
    }

    /**
     *
     * @return {Promise}
     */
    delete() {
        if (this._name === APPS.DEFAULT_APP_NAME && this._nativeInitialized) {
            return Promise.reject(
                new Error('Unable to delete the default native firebase app instance.'),
            );
        }

        return FirebaseCoreModule.deleteApp(this._name).then(() => APPS.deleteApp(this._name));
    }

    /**
     *
     * @return {*}
     */
    onReady() {
        if (this._initialized) return Promise.resolve(this);

        return new Promise((resolve, reject) => {
            SharedEventEmitter.once(`AppReady:${this._name}`, ({ error }) => {
                if (error) return reject(new Error(error)); // error is a string as it's from native
                return resolve(this); // return app
            });
        });
    }

    /**
     * toString returns the name of the app.
     *
     * @return {string}
     */
    toString() {
        return this._name;
    }

}
