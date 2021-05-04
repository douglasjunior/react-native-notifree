import APPS from '../../utils/apps';
import {
    statics as NotificationsStatics,
    MODULE_NAME as NotificationsModuleName,
} from '../notifications';
import {
    statics as UtilsStatics,
    MODULE_NAME as UtilsModuleName,
} from '../utils';

class Firebase {

  admob ;

  analytics ;

  auth ;

  config ;

  crashlytics ;

  database ;

  firestore ;

  functions ;

  iid ;

  links ;

  messaging ;

  notifications ;

  perf ;

  storage ;

  utils ;

  constructor() {
      this.notifications = APPS.moduleAndStatics(
          'notifications',
          NotificationsStatics,
          NotificationsModuleName,
      );
      this.utils = APPS.moduleAndStatics('utils', UtilsStatics, UtilsModuleName);
  }

  /**
   * Web SDK initializeApp
   *
   * @param options
   * @param name
   * @return {*}
   */
  initializeApp(options, name) {
      return APPS.initializeApp(options, name);
  }

  /**
   * Retrieves a Firebase app instance.
   *
   * When called with no arguments, the default app is returned.
   * When an app name is provided, the app corresponding to that name is returned.
   *
   * @param name
   * @return {*}
   */
  app(name) {
      return APPS.app(name);
  }

  /**
   * A (read-only) array of all initialized apps.
   * @return {Array}
   */
  get apps() {
      return APPS.apps();
  }

}

const firebaseApp = new Firebase();
export default firebaseApp;
export const {
    notifications,
    utils,
} = firebaseApp;
