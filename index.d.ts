declare module 'react-native-notifree' {

  export default interface Notifications {
    android: AndroidNotifications;

    /**
     * Cancels all notifications
     */
    cancelAllNotifications(): void;

    /**
     * Cancels a notification by ID
     */
    cancelNotification(notificationId: string): void;

    displayNotification(notification: Notification): Promise<void>;

    /**
     * Returns the current badge number on the app icon.
     */
    getBadge(): Promise<number>;

    getInitialNotification(): Promise<NotificationOpen>;

    getScheduledNotifications(): Promise<Notification[]>;

    onNotification(
      listener: (notification: Notification) => any
    ): () => any;

    onNotificationDisplayed(
      listener: (notification: Notification) => any
    ): () => any;

    onNotificationOpened(
      listener: (notificationOpen: NotificationOpen) => any
    ): () => any;

    removeAllDeliveredNotifications(): void;

    removeDeliveredNotification(notificationId: string): void;

    /**
     * Schedule a local notification to be shown on the device.
     */
    scheduleNotification(
      notification: Notification,
      schedule: Schedule
    ): any;

    /**
     * Sets the badge number on the iOS app icon.
     */
    setBadge(badge: number): void;
  }

  class Notification {
    android: AndroidNotification;
    ios: IOSNotification;
    body: string;
    data: { [key: string]: string };
    notificationId: string;
    sound?: string;
    subtitle?: string;
    title: string;

    constructor();

    setBody(body: string): Notification;

    setData(data: any): Notification;

    setNotificationId(notificationId: string): Notification;

    setSound(sound: string): Notification;

    setSubtitle(subtitle: string): Notification;

    setTitle(title: string): Notification;
  }

  class NotificationOpen {
    action: string;
    notification: Notification;
    results?: any;
  }

  class AndroidNotification {
    actions?: Android.Action[];
    autoCancel?: boolean;
    badgeIconType?: Android.BadgeIconType;
    bigPicture?: any;
    bigText?: any;
    category?: Android.Category;
    channelId?: string;
    clickAction?: string;
    color?: string;
    colorized?: boolean;
    contentInfo?: string;
    defaults?: Android.Defaults[];
    group?: string;
    groupAlertBehaviour?: Android.GroupAlert;
    groupSummary?: boolean;
    largeIcon?: string;
    lights?: Android.Lights;
    localOnly?: boolean;
    number?: number;
    ongoing?: boolean;
    onlyAlertOnce?: boolean;
    people?: string[];
    priority?: Android.Priority;
    progress?: Android.Progress;
    remoteInputHistory?: string[];
    shortcutId?: string;
    showWhen?: boolean;
    smallIcon?: any;
    sortKey?: string;
    tag?: string;
    ticker?: string;
    timeoutAfter?: number;
    usesChronometer?: boolean;
    vibrate?: number[];
    visibility?: Android.Visibility;
    when?: number;

    addAction(action: Android.Action): Notification;

    addPerson(person: string): Notification;

    setAutoCancel(autoCancel: boolean): Notification;

    setBadgeIconType(badgeIconType: Android.BadgeIconType): Notification;

    setBigPicture(
      picture: string,
      largeIcon?: string,
      contentTitle?: string,
      summaryText?: string
    ): Notification;

    setBigText(
      text: string,
      contentTitle?: string,
      summaryText?: string
    ): Notification;

    setCategory(category: Android.Category): Notification;

    setChannelId(channelId: string): Notification;

    setClickAction(clickAction: string): Notification;

    setColor(color: string): Notification;

    setColorized(colorized: boolean): Notification;

    setContentInfo(contentInfo: string): Notification;

    setDefaults(defaults: Android.Defaults[]): Notification;

    setGroup(group: string): Notification;

    setGroupAlertBehaviour(
      groupAlertBehaviour: Android.GroupAlert
    ): Notification;

    setGroupSummary(groupSummary: boolean): Notification;

    setLargeIcon(largeIcon: string): Notification;

    setLights(argb: number, onMs: number, offMs: number): Notification;

    setLocalOnly(localOnly: boolean): Notification;

    setNumber(number: number): Notification;

    setOngoing(ongoing: boolean): Notification;

    setOnlyAlertOnce(onlyAlertOnce: boolean): Notification;

    setPriority(priority: Android.Priority): Notification;

    setProgress(
      max: number,
      progress: number,
      indeterminate: boolean
    ): Notification;

    //setPublicVersion(publicVersion: Notification): Notification
    setRemoteInputHistory(remoteInputHistory: string[]): Notification;

    setShortcutId(shortcutId: string): Notification;

    setShowWhen(showWhen: boolean): Notification;

    setSmallIcon(icon: string, level?: number): Notification;

    setSortKey(sortKey: string): Notification;

    setTag(tag: string): Notification;

    setTicker(ticker: string): Notification;

    setTimeoutAfter(timeoutAfter: number): Notification;

    setUsesChronometer(usesChronometer: boolean): Notification;

    setVibrate(vibrate: number[]): Notification;

    setVisibility(visibility: Android.Visibility): Notification;

    setWhen(when: number): Notification;
  }

  namespace Android {
    class Action {
      action: string;
      allowGeneratedReplies: boolean;
      icon: string;
      remoteInputs: RemoteInput[];
      semanticAction?: SemanticAction;
      showUserInterface?: boolean;
      title: string;

      constructor(action: string, icon: string, title: string);

      addRemoteInput(remoteInput: RemoteInput): Action;

      setAllowGenerateReplies(allowGeneratedReplies: boolean): Action;

      setSemanticAction(semanticAction: SemanticAction): Action;

      setShowUserInterface(showUserInterface: boolean): Action;
    }

    class RemoteInput {
      allowedDataTypes: any[];
      allowFreeFormInput?: boolean;
      choices: string[];
      label?: string;
      resultKey: string;

      constructor(resultKey: string);

      setAllowDataType(mimeType: string, allow: boolean): RemoteInput;

      setAllowFreeFormInput(allowFreeFormInput: boolean): RemoteInput;

      setChoices(choices: string[]): RemoteInput;

      setLabel(label: string): RemoteInput;
    }

    class Channel {
      channelId: string;
      name: string;
      importance: Importance;

      bypassDnd?: boolean;
      description?: string;
      group?: string;
      lightColor?: string;
      lightsEnabled?: boolean;
      lockScreenVisibility?: Visibility;
      showBadge?: boolean;
      sound?: string;
      vibrationEnabled?: boolean;
      vibrationPattern?: number[];

      constructor(channelId: string, name: string, importance: Importance);

      enableLights(lightsEnabled: boolean): Channel;

      enableVibration(vibrationEnabled: boolean): Channel;

      setBypassDnd(bypassDnd: boolean): Channel;

      setDescription(description: string): Channel;

      setGroup(groupId: string): Channel;

      setLightColor(lightColor: string): Channel;

      setLockScreenVisibility(lockScreenVisibility: Visibility): Channel;

      setShowBadge(showBadge: boolean): Channel;

      setSound(sound: string): Channel;

      setVibrationPattern(vibrationPattern: number[]): Channel;
    }

    class ChannelGroup {
      groupId: string;
      name: string;

      constructor(groupId: string, name: string);
    }

    export enum BadgeIconType {
      Large = 2,
      None = 0,
      Small = 1,
    }

    export type Category =
      | 'alarm'
      | 'call'
      | 'email'
      | 'err'
      | 'event'
      | 'msg'
      | 'progress'
      | 'promo'
      | 'recommendation'
      | 'reminder'
      | 'service'
      | 'social'
      | 'status'
      | 'system'
      | 'transport';

    export enum Defaults {
      All = -1,
      Lights = 4,
      Sound = 1,
      Vibrate = 2,
    }

    export enum GroupAlert {
      All = 0,
      Children = 2,
      Summary = 1,
    }

    export enum Importance {
      Default = 3,
      High = 4,
      Low = 2,
      Max = 5,
      Min = 1,
      None = 3,
      Unspecified = -1000,
    }

    export enum Priority {
      Default = 0,
      High = 1,
      Low = -1,
      Max = 2,
      Min = -2,
    }

    export enum SemanticAction {
      Archive = 5,
      Call = 10,
      Delete = 4,
      MarkAsRead = 2,
      MarkAsUnread = 3,
      Mute = 6,
      None = 0,
      Reply = 1,
      ThumbsDown = 9,
      ThumbsUp = 8,
      Unmute = 7,
    }

    export enum Visibility {
      Private = 0,
      Public = 1,
      Secret = -1,
    }

    class Lights {
      argb: number;
      offMs: number;
      onMs: number;
    }

    class Progress {
      indeterminate: boolean;
      max: number;
      progress: number;
    }
  }

  class IOSNotification {
    alertAction?: string;
    attachments: IOSAttachment[];
    badge?: number;
    category?: string;
    hasAction?: boolean;
    launchImage?: string;
    threadIdentifier?: string;
    complete?: CompletionHandler;

    addAttachment(
      identifier: string,
      url: string,
      options: IOSAttachmentOptions
    ): Notification;

    setAlertAction(alertAction: string): Notification;

    setBadge(badge: number): Notification;

    setCategory(category: string): Notification;

    setHasAction(hasAction: boolean): Notification;

    setLaunchImage(launchImage: string): Notification;

    setThreadIdentifier(threadIdentifier: string): Notification;
  }

  class IOSAttachment {
    identifier: string;
    options: IOSAttachmentOptions;
    url: string;
  }

  class IOSAttachmentOptions {
    typeHint: string;
    thumbnailHidden: boolean;
    thumbnailClippingRect: any;
    thumbnailTime: string;
  }

  interface NotificationsStatics {
    Android: {
      Action: typeof Android.Action;
      BadgeIconType: typeof Android.BadgeIconType;
      Category: Android.Category;
      Channel: typeof Android.Channel;
      ChannelGroup: typeof Android.ChannelGroup;
      Defaults: typeof Android.Defaults;
      GroupAlert: typeof Android.GroupAlert;
      Importance: typeof Android.Importance;
      Priority: typeof Android.Priority;
      RemoteInput: typeof Android.RemoteInput;
      SemanticAction: typeof Android.SemanticAction;
      Visibility: typeof Android.Visibility;
    };
    Notification: typeof Notification;
  }

}
