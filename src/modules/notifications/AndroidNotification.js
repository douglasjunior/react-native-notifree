/**
 *
 * AndroidNotification representation wrapper
 */
import AndroidAction, { fromNativeAndroidAction } from './AndroidAction';
import {
    BadgeIconType, Category, GroupAlert, Priority,
} from './types';

export default class AndroidNotification {

  _actions ;

  _autoCancel ;

  _badgeIconType ;

  _bigPicture ;

  _bigText ;

  _category ;

  _channelId ;

  _clickAction ;

  _color ;

  _colorized ;

  _contentInfo ;

  _defaults ;

  _group ;

  _groupAlertBehaviour ;

  _groupSummary ;

  _largeIcon ;

  _lights ;

  _localOnly ;

  _notification ;

  _number ;

  _ongoing ;

  _onlyAlertOnce ;

  _people ;

  _priority ;

  _progress ;

  // _publicVersion: Notification;
  _remoteInputHistory ;

  _shortcutId ;

  _showWhen ;

  _smallIcon ;

  _sortKey ;

  // TODO: style: Style; // Need to figure out if this can work
  _tag ;

  _ticker ;

  _timeoutAfter ;

  _usesChronometer ;

  _vibrate ;

  _visibility ;

  _when ;

  // android unsupported
  // content: RemoteViews
  // contentIntent: PendingIntent - need to look at what this is
  // customBigContentView: RemoteViews
  // customContentView: RemoteViews
  // customHeadsUpContentView: RemoteViews
  // deleteIntent: PendingIntent
  // fullScreenIntent: PendingIntent
  // sound.streamType

  constructor(notification, data) {
      this._notification = notification;

      if (data) {
          this._actions = data.actions
              ? data.actions.map(action => fromNativeAndroidAction(action))
              : [];
          this._autoCancel = data.autoCancel;
          this._badgeIconType = data.badgeIconType;
          this._bigPicture = data.bigPicture;
          this._bigText = data.bigText;
          this._category = data.category;
          this._channelId = data.channelId;
          this._clickAction = data.clickAction;
          this._color = data.color;
          this._colorized = data.colorized;
          this._contentInfo = data.contentInfo;
          this._defaults = data.defaults;
          this._group = data.group;
          this._groupAlertBehaviour = data.groupAlertBehaviour;
          this._groupSummary = data.groupSummary;
          this._largeIcon = data.largeIcon;
          this._lights = data.lights;
          this._localOnly = data.localOnly;
          this._number = data.number;
          this._ongoing = data.ongoing;
          this._onlyAlertOnce = data.onlyAlertOnce;
          this._people = data.people;
          this._priority = data.priority;
          this._progress = data.progress;
          // _publicVersion: Notification;
          this._remoteInputHistory = data.remoteInputHistory;
          this._shortcutId = data.shortcutId;
          this._showWhen = data.showWhen;
          this._smallIcon = data.smallIcon;
          this._sortKey = data.sortKey;
          this._tag = data.tag;
          this._ticker = data.ticker;
          this._timeoutAfter = data.timeoutAfter;
          this._usesChronometer = data.usesChronometer;
          this._vibrate = data.vibrate;
          this._visibility = data.visibility;
          this._when = data.when;
      }

      // Defaults
      this._actions = this._actions || [];
      this._people = this._people || [];
      this._smallIcon = this._smallIcon || {
          icon: 'ic_launcher',
      };
  }

  get actions() {
      return this._actions;
  }

  get autoCancel() {
      return this._autoCancel;
  }

  get badgeIconType() {
      return this._badgeIconType;
  }

  get bigPicture() {
      return this._bigPicture;
  }

  get bigText() {
      return this._bigText;
  }

  get category() {
      return this._category;
  }

  get channelId() {
      return this._channelId;
  }

  get clickAction() {
      return this._clickAction;
  }

  get color() {
      return this._color;
  }

  get colorized() {
      return this._colorized;
  }

  get contentInfo() {
      return this._contentInfo;
  }

  get defaults() {
      return this._defaults;
  }

  get group() {
      return this._group;
  }

  get groupAlertBehaviour() {
      return this._groupAlertBehaviour;
  }

  get groupSummary() {
      return this._groupSummary;
  }

  get largeIcon() {
      return this._largeIcon;
  }

  get lights() {
      return this._lights;
  }

  get localOnly() {
      return this._localOnly;
  }

  get number() {
      return this._number;
  }

  get ongoing() {
      return this._ongoing;
  }

  get onlyAlertOnce() {
      return this._onlyAlertOnce;
  }

  get people() {
      return this._people;
  }

  get priority() {
      return this._priority;
  }

  get progress() {
      return this._progress;
  }

  get remoteInputHistory() {
      return this._remoteInputHistory;
  }

  get shortcutId() {
      return this._shortcutId;
  }

  get showWhen() {
      return this._showWhen;
  }

  get smallIcon() {
      return this._smallIcon;
  }

  get sortKey() {
      return this._sortKey;
  }

  get tag() {
      return this._tag;
  }

  get ticker() {
      return this._ticker;
  }

  get timeoutAfter() {
      return this._timeoutAfter;
  }

  get usesChronometer() {
      return this._usesChronometer;
  }

  get vibrate() {
      return this._vibrate;
  }

  get visibility() {
      return this._visibility;
  }

  get when() {
      return this._when;
  }

  /**
   *
   * @param action
   * @returns {Notification}
   */
  addAction(action) {
      if (!(action instanceof AndroidAction)) {
          throw new Error(
              `AndroidNotification:addAction expects an 'AndroidAction' but got type ${typeof action}`,
          );
      }
      this._actions.push(action);
      return this._notification;
  }

  /**
   *
   * @param person
   * @returns {Notification}
   */
  addPerson(person) {
      this._people.push(person);
      return this._notification;
  }

  /**
   *
   * @param autoCancel
   * @returns {Notification}
   */
  setAutoCancel(autoCancel) {
      this._autoCancel = autoCancel;
      return this._notification;
  }

  /**
   *
   * @param badgeIconType
   * @returns {Notification}
   */
  setBadgeIconType(badgeIconType) {
      if (!Object.values(BadgeIconType).includes(badgeIconType)) {
          throw new Error(
              `AndroidNotification:setBadgeIconType Invalid BadgeIconType: ${badgeIconType}`,
          );
      }
      this._badgeIconType = badgeIconType;
      return this._notification;
  }

  setBigPicture(
      picture,
      largeIcon,
      contentTitle,
      summaryText,
  ) {
      this._bigPicture = {
          contentTitle,
          largeIcon,
          picture,
          summaryText,
      };
      return this._notification;
  }

  setBigText(
      text,
      contentTitle,
      summaryText,
  ) {
      this._bigText = {
          contentTitle,
          summaryText,
          text,
      };
      return this._notification;
  }

  /**
   *
   * @param category
   * @returns {Notification}
   */
  setCategory(category) {
      if (!Object.values(Category).includes(category)) {
          throw new Error(
              `AndroidNotification:setCategory Invalid Category: ${category}`,
          );
      }
      this._category = category;
      return this._notification;
  }

  /**
   *
   * @param channelId
   * @returns {Notification}
   */
  setChannelId(channelId) {
      this._channelId = channelId;
      return this._notification;
  }

  /**
   *
   * @param clickAction
   * @returns {Notification}
   */
  setClickAction(clickAction) {
      this._clickAction = clickAction;
      return this._notification;
  }

  /**
   *
   * @param color
   * @returns {Notification}
   */
  setColor(color) {
      this._color = color;
      return this._notification;
  }

  /**
   *
   * @param colorized
   * @returns {Notification}
   */
  setColorized(colorized) {
      this._colorized = colorized;
      return this._notification;
  }

  /**
   *
   * @param contentInfo
   * @returns {Notification}
   */
  setContentInfo(contentInfo) {
      this._contentInfo = contentInfo;
      return this._notification;
  }

  /**
   *
   * @param defaults
   * @returns {Notification}
   */
  setDefaults(defaults) {
      this._defaults = defaults;
      return this._notification;
  }

  /**
   *
   * @param group
   * @returns {Notification}
   */
  setGroup(group) {
      this._group = group;
      return this._notification;
  }

  /**
   *
   * @param groupAlertBehaviour
   * @returns {Notification}
   */
  setGroupAlertBehaviour(groupAlertBehaviour) {
      if (!Object.values(GroupAlert).includes(groupAlertBehaviour)) {
          throw new Error(
              `AndroidNotification:setGroupAlertBehaviour Invalid GroupAlert: ${groupAlertBehaviour}`,
          );
      }
      this._groupAlertBehaviour = groupAlertBehaviour;
      return this._notification;
  }

  /**
   *
   * @param groupSummary
   * @returns {Notification}
   */
  setGroupSummary(groupSummary) {
      this._groupSummary = groupSummary;
      return this._notification;
  }

  /**
   *
   * @param largeIcon
   * @returns {Notification}
   */
  setLargeIcon(largeIcon) {
      this._largeIcon = largeIcon;
      return this._notification;
  }

  /**
   *
   * @param argb
   * @param onMs
   * @param offMs
   * @returns {Notification}
   */
  setLights(argb, onMs, offMs) {
      this._lights = {
          argb,
          onMs,
          offMs,
      };
      return this._notification;
  }

  /**
   *
   * @param localOnly
   * @returns {Notification}
   */
  setLocalOnly(localOnly) {
      this._localOnly = localOnly;
      return this._notification;
  }

  /**
   *
   * @param number
   * @returns {Notification}
   */
  setNumber(number) {
      this._number = number;
      return this._notification;
  }

  /**
   *
   * @param ongoing
   * @returns {Notification}
   */
  setOngoing(ongoing) {
      this._ongoing = ongoing;
      return this._notification;
  }

  /**
   *
   * @param onlyAlertOnce
   * @returns {Notification}
   */
  setOnlyAlertOnce(onlyAlertOnce) {
      this._onlyAlertOnce = onlyAlertOnce;
      return this._notification;
  }

  /**
   *
   * @param priority
   * @returns {Notification}
   */
  setPriority(priority) {
      if (!Object.values(Priority).includes(priority)) {
          throw new Error(
              `AndroidNotification:setPriority Invalid Priority: ${priority}`,
          );
      }
      this._priority = priority;
      return this._notification;
  }

  /**
   *
   * @param max
   * @param progress
   * @param indeterminate
   * @returns {Notification}
   */
  setProgress(
      max,
      progress,
      indeterminate,
  ) {
      this._progress = {
          max,
          progress,
          indeterminate,
      };
      return this._notification;
  }

  /**
   *
   * @param publicVersion
   * @returns {Notification}
   */
  /* setPublicVersion(publicVersion: Notification): Notification {
    this._publicVersion = publicVersion;
    return this._notification;
  } */

  /**
   *
   * @param remoteInputHistory
   * @returns {Notification}
   */
  setRemoteInputHistory(remoteInputHistory) {
      this._remoteInputHistory = remoteInputHistory;
      return this._notification;
  }

  /**
   *
   * @param shortcutId
   * @returns {Notification}
   */
  setShortcutId(shortcutId) {
      this._shortcutId = shortcutId;
      return this._notification;
  }

  /**
   *
   * @param showWhen
   * @returns {Notification}
   */
  setShowWhen(showWhen) {
      this._showWhen = showWhen;
      return this._notification;
  }

  /**
   *
   * @param icon
   * @param level
   * @returns {Notification}
   */
  setSmallIcon(icon, level) {
      this._smallIcon = {
          icon,
          level,
      };
      return this._notification;
  }

  /**
   *
   * @param sortKey
   * @returns {Notification}
   */
  setSortKey(sortKey) {
      this._sortKey = sortKey;
      return this._notification;
  }

  /**
   *
   * @param tag
   * @returns {Notification}
   */
  setTag(tag) {
      this._tag = tag;
      return this._notification;
  }

  /**
   *
   * @param ticker
   * @returns {Notification}
   */
  setTicker(ticker) {
      this._ticker = ticker;
      return this._notification;
  }

  /**
   *
   * @param timeoutAfter
   * @returns {Notification}
   */
  setTimeoutAfter(timeoutAfter) {
      this._timeoutAfter = timeoutAfter;
      return this._notification;
  }

  /**
   *
   * @param usesChronometer
   * @returns {Notification}
   */
  setUsesChronometer(usesChronometer) {
      this._usesChronometer = usesChronometer;
      return this._notification;
  }

  /**
   *
   * @param vibrate
   * @returns {Notification}
   */
  setVibrate(vibrate) {
      this._vibrate = vibrate;
      return this._notification;
  }

  /**
   *
   * @param visibility
   * @returns {Notification}
   */
  setVisibility(visibility) {
      this._visibility = visibility;
      return this._notification;
  }

  /**
   *
   * @param when
   * @returns {Notification}
   */
  setWhen(when) {
      this._when = when;
      return this._notification;
  }

  build() {
      // TODO: Validation of required fields
      if (!this._channelId) {
          throw new Error(
              'AndroidNotification: Missing required `channelId` property',
          );
      } else if (!this._smallIcon) {
          throw new Error(
              'AndroidNotification: Missing required `smallIcon` property',
          );
      }

      return {
          actions: this._actions.map(action => action.build()),
          autoCancel: this._autoCancel,
          badgeIconType: this._badgeIconType,
          bigPicture: this._bigPicture,
          bigText: this._bigText,
          category: this._category,
          channelId: this._channelId,
          clickAction: this._clickAction,
          color: this._color,
          colorized: this._colorized,
          contentInfo: this._contentInfo,
          defaults: this._defaults,
          group: this._group,
          groupAlertBehaviour: this._groupAlertBehaviour,
          groupSummary: this._groupSummary,
          largeIcon: this._largeIcon,
          lights: this._lights,
          localOnly: this._localOnly,
          number: this._number,
          ongoing: this._ongoing,
          onlyAlertOnce: this._onlyAlertOnce,
          people: this._people,
          priority: this._priority,
          progress: this._progress,
          // publicVersion: this._publicVersion,
          remoteInputHistory: this._remoteInputHistory,
          shortcutId: this._shortcutId,
          showWhen: this._showWhen,
          smallIcon: this._smallIcon,
          sortKey: this._sortKey,
          // TODO: style: Style,
          tag: this._tag,
          ticker: this._ticker,
          timeoutAfter: this._timeoutAfter,
          usesChronometer: this._usesChronometer,
          vibrate: this._vibrate,
          visibility: this._visibility,
          when: this._when,
      };
  }

}
