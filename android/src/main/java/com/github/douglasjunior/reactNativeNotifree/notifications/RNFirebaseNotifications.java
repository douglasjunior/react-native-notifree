package com.github.douglasjunior.reactNativeNotifree.notifications;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;

import androidx.core.app.RemoteInput;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.github.douglasjunior.reactNativeNotifree.Utils;

import java.util.ArrayList;
import java.util.Collections;

import me.leolin.shortcutbadger.ShortcutBadger;

public class RNFirebaseNotifications extends ReactContextBaseJavaModule implements ActivityEventListener {
    private static final String BADGE_FILE = "BadgeCountFile";
    private static final String BADGE_KEY = "BadgeCount";
    private static final String TAG = "RNFirebaseNotifications";

    private SharedPreferences sharedPreferences = null;

    private RNFirebaseNotificationManager notificationManager;

    public RNFirebaseNotifications(ReactApplicationContext context) {
        super(context);
        context.addActivityEventListener(this);

        notificationManager = new RNFirebaseNotificationManager(context);
        sharedPreferences = context.getSharedPreferences(BADGE_FILE, Context.MODE_PRIVATE);
    }

    @Override
    public String getName() {
        return "RNFirebaseNotifications";
    }

    @ReactMethod
    public void displayNotification(ReadableMap notification, Promise promise) {
        notificationManager.displayNotification(notification, promise);
    }

    @ReactMethod
    public void getBadge(Promise promise) {
        int badge = sharedPreferences.getInt(BADGE_KEY, 0);
        Log.d(TAG, "Got badge count: " + badge);
        promise.resolve(badge);
    }

    @ReactMethod
    public void getInitialNotification(Promise promise) {
        WritableMap notificationOpenMap = null;
        if (getCurrentActivity() != null) {
            notificationOpenMap = parseIntentForNotification(getCurrentActivity().getIntent());
        }
        promise.resolve(notificationOpenMap);
    }

    @ReactMethod
    public void getScheduledNotifications(Promise promise) {
        ArrayList<Bundle> bundles = notificationManager.getScheduledNotifications();
        WritableArray array = Arguments.createArray();
        for (Bundle bundle : bundles) {
            array.pushMap(parseNotificationBundle(bundle));
        }
        promise.resolve(array);
    }

    @ReactMethod
    public void removeAllDeliveredNotifications(Promise promise) {
        notificationManager.removeAllDeliveredNotifications(promise);
    }

    @ReactMethod
    public void removeDeliveredNotification(String notificationId, Promise promise) {
        notificationManager.removeDeliveredNotification(notificationId, promise);
    }

    @ReactMethod
    public void removeDeliveredNotificationsByTag(String tag, Promise promise) {
        notificationManager.removeDeliveredNotificationsByTag(tag, promise);
    }

    @ReactMethod
    public void setBadge(int badge, Promise promise) {
        // Store the badge count for later retrieval
        sharedPreferences
                .edit()
                .putInt(BADGE_KEY, badge)
                .apply();
        if (badge == 0) {
            Log.d(TAG, "Remove badge count");
            ShortcutBadger.removeCount(this.getReactApplicationContext());
        } else {
            Log.d(TAG, "Apply badge count: " + badge);
            ShortcutBadger.applyCount(this.getReactApplicationContext(), badge);
        }
        promise.resolve(null);
    }

    //////////////////////////////////////////////////////////////////////
    // Start Android specific methods
    //////////////////////////////////////////////////////////////////////
    @ReactMethod
    public void createChannel(ReadableMap channelMap, Promise promise) {
        try {
            notificationManager.createChannel(channelMap);
        } catch (Throwable t) {
            // do nothing - most likely a NoSuchMethodError for < v4 support lib
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void createChannelGroup(ReadableMap channelGroupMap, Promise promise) {
        try {
            notificationManager.createChannelGroup(channelGroupMap);
        } catch (Throwable t) {
            // do nothing - most likely a NoSuchMethodError for < v4 support lib
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void createChannelGroups(ReadableArray channelGroupsArray, Promise promise) {
        try {
            notificationManager.createChannelGroups(channelGroupsArray);
        } catch (Throwable t) {
            // do nothing - most likely a NoSuchMethodError for < v4 support lib
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void createChannels(ReadableArray channelsArray, Promise promise) {
        try {
            notificationManager.createChannels(channelsArray);
        } catch (Throwable t) {
            // do nothing - most likely a NoSuchMethodError for < v4 support lib
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void deleteChannelGroup(String channelId, Promise promise) {
        try {
            notificationManager.deleteChannelGroup(channelId);
            promise.resolve(null);
        } catch (NullPointerException e) {
            promise.reject(
                    "notifications/channel-group-not-found",
                    "The requested NotificationChannelGroup does not exist, have you created it?"
            );
        }
    }

    @ReactMethod
    public void deleteChannel(String channelId, Promise promise) {
        try {
            notificationManager.deleteChannel(channelId);
        } catch (Throwable t) {
            // do nothing - most likely a NoSuchMethodError for < v4 support lib
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void getChannel(String channelId, Promise promise) {
        try {
            promise.resolve(notificationManager.getChannel(channelId));
            return;
        } catch (Throwable t) {
            // do nothing - most likely a NoSuchMethodError for < v4 support lib
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void getChannels(Promise promise) {
        try {
            promise.resolve(notificationManager.getChannels());
            return;
        } catch (Throwable t) {
            // do nothing - most likely a NoSuchMethodError for < v4 support lib
        }
        promise.resolve(Collections.emptyList());
    }

    @ReactMethod
    public void getChannelGroup(String channelGroupId, Promise promise) {
        try {
            promise.resolve(notificationManager.getChannelGroup(channelGroupId));
            return;
        } catch (Throwable t) {
            // do nothing - most likely a NoSuchMethodError for < v4 support lib
        }
        promise.resolve(null);
    }

    @ReactMethod
    public void getChannelGroups(Promise promise) {
        try {
            promise.resolve(notificationManager.getChannelGroups());
            return;
        } catch (Throwable t) {
            // do nothing - most likely a NoSuchMethodError for < v4 support lib
        }
        promise.resolve(Collections.emptyList());
    }
    //////////////////////////////////////////////////////////////////////
    // End Android specific methods
    //////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////
    // Start ActivityEventListener methods
    //////////////////////////////////////////////////////////////////////
    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        // FCM functionality does not need this function
    }

    @Override
    public void onNewIntent(Intent intent) {
        WritableMap notificationOpenMap = parseIntentForNotification(intent);
        if (notificationOpenMap != null) {
            Utils.sendEvent(
                    getReactApplicationContext(),
                    "notifications_notification_opened",
                    notificationOpenMap
            );
        }
    }

    //////////////////////////////////////////////////////////////////////
    // End ActivityEventListener methods
    //////////////////////////////////////////////////////////////////////

    private WritableMap parseIntentForNotification(Intent intent) {
        WritableMap notificationOpenMap = parseIntentForRemoteNotification(intent);
        if (notificationOpenMap == null) {
            notificationOpenMap = parseIntentForLocalNotification(intent);
        }
        return notificationOpenMap;
    }

    private WritableMap parseIntentForLocalNotification(Intent intent) {
        if (intent.getExtras() == null || !intent.hasExtra("notificationId")) {
            return null;
        }

        WritableMap notificationMap = Arguments.makeNativeMap(intent.getExtras());
        WritableMap notificationOpenMap = Arguments.createMap();
        notificationOpenMap.putString("action", intent.getAction());
        notificationOpenMap.putMap("notification", notificationMap);

        // Check for remote input results
        Bundle remoteInput = RemoteInput.getResultsFromIntent(intent);
        if (remoteInput != null) {
            notificationOpenMap.putMap("results", Arguments.makeNativeMap(remoteInput));
        }

        return notificationOpenMap;
    }

    private WritableMap parseIntentForRemoteNotification(Intent intent) {
        // Check if FCM data exists
        if (intent.getExtras() == null || !intent.hasExtra("google.message_id")) {
            return null;
        }

        Bundle extras = intent.getExtras();

        WritableMap notificationMap = Arguments.createMap();
        WritableMap dataMap = Arguments.createMap();

        for (String key : extras.keySet()) {
            if (key.equals("google.message_id")) {
                notificationMap.putString("notificationId", extras.getString(key));
            } else if (key.equals("collapse_key")
                    || key.equals("from")
                    || key.equals("google.sent_time")
                    || key.equals("google.ttl")
                    || key.equals("_fbSourceApplicationHasBeenSet")) {
                // ignore known unneeded fields
            } else {
                dataMap.putString(key, extras.getString(key));
            }
        }
        notificationMap.putMap("data", dataMap);

        WritableMap notificationOpenMap = Arguments.createMap();
        notificationOpenMap.putString("action", intent.getAction());
        notificationOpenMap.putMap("notification", notificationMap);

        return notificationOpenMap;
    }

    private WritableMap parseNotificationBundle(Bundle notification) {
        return Arguments.makeNativeMap(notification);
    }
}
