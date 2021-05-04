package com.github.douglasjunior.reactNativeNotifree.notifications;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationChannelGroup;
import android.app.NotificationManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.OpenableColumns;
import android.service.notification.StatusBarNotification;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.github.douglasjunior.reactNativeNotifree.messaging.BundleJSONConverter;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

class RNFirebaseNotificationManager {

    private static final String PREFERENCES_KEY = "RNFNotifications";
    private static final String TAG = "RNFNotificationManager";
    private AlarmManager alarmManager;
    private Context context;
    private ReactApplicationContext reactContext;
    private NotificationManager notificationManager;
    private SharedPreferences preferences;

    RNFirebaseNotificationManager(ReactApplicationContext reactContext) {
        this(reactContext.getApplicationContext());
        this.reactContext = reactContext;
    }

    RNFirebaseNotificationManager(Context context) {
        this.alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        this.context = context;
        this.notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        this.preferences = context.getSharedPreferences(PREFERENCES_KEY, Context.MODE_PRIVATE);
    }

    static int getResourceId(Context context, String type, String image) {
        return context
                .getResources()
                .getIdentifier(image, type, context.getPackageName());
    }

    static Uri getSound(Context context, String sound) {
        if (sound == null) {
            return null;
        } else if (sound.contains("://")) {
            return Uri.parse(sound);
        } else if (sound.equalsIgnoreCase("default")) {
            return RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        } else {
            int soundResourceId = getResourceId(context, "raw", sound);
            if (soundResourceId == 0) {
                soundResourceId = getResourceId(context, "raw", sound.substring(0, sound.lastIndexOf('.')));
            }
            return Uri.parse("android.resource://" + context.getPackageName() + "/" + soundResourceId);
        }
    }

    void createChannel(ReadableMap channelMap) {
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = parseChannelMap(channelMap);
            notificationManager.createNotificationChannel(channel);
        }
    }

    void createChannelGroup(ReadableMap channelGroupMap) {
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannelGroup channelGroup = parseChannelGroupMap(channelGroupMap);
            notificationManager.createNotificationChannelGroup(channelGroup);
        }
    }

    void createChannelGroups(ReadableArray channelGroupsArray) {
        if (Build.VERSION.SDK_INT >= 26) {
            List<NotificationChannelGroup> channelGroups = new ArrayList<>();
            for (int i = 0; i < channelGroupsArray.size(); i++) {
                NotificationChannelGroup channelGroup = parseChannelGroupMap(channelGroupsArray.getMap(i));
                channelGroups.add(channelGroup);
            }
            notificationManager.createNotificationChannelGroups(channelGroups);
        }
    }

    void createChannels(ReadableArray channelsArray) {
        if (Build.VERSION.SDK_INT >= 26) {
            List<NotificationChannel> channels = new ArrayList<>();
            for (int i = 0; i < channelsArray.size(); i++) {
                NotificationChannel channel = parseChannelMap(channelsArray.getMap(i));
                channels.add(channel);
            }
            notificationManager.createNotificationChannels(channels);
        }
    }

    void deleteChannelGroup(String groupId) {
        if (Build.VERSION.SDK_INT >= 26) {
            notificationManager.deleteNotificationChannelGroup(groupId);
        }
    }

    void deleteChannel(String channelId) {
        if (Build.VERSION.SDK_INT >= 26) {
            notificationManager.deleteNotificationChannel(channelId);
        }
    }

    void displayNotification(ReadableMap notification, Promise promise) {
        Bundle notificationBundle = Arguments.toBundle(notification);
        displayNotification(notificationBundle, promise);
    }

    WritableMap getChannel(String channelId) {
        if (Build.VERSION.SDK_INT >= 26) {
            return createChannelMap(notificationManager.getNotificationChannel(channelId));
        }

        return null;
    }

    WritableArray getChannels() {
        if (Build.VERSION.SDK_INT >= 26) {
            return createChannelsArray(notificationManager.getNotificationChannels());
        }

        return null;
    }

    WritableMap getChannelGroup(String channelGroupId) {
        if (Build.VERSION.SDK_INT >= 28) {
            return createChannelGroupMap(notificationManager.getNotificationChannelGroup(channelGroupId));
        }

        return null;
    }

    WritableArray getChannelGroups() {
        if (Build.VERSION.SDK_INT >= 26) {
            return createChannelGroupsArray(notificationManager.getNotificationChannelGroups());
        }

        return null;
    }

    ArrayList<Bundle> getScheduledNotifications() {
        ArrayList<Bundle> array = new ArrayList<>();

        Map<String, ?> notifications = preferences.getAll();

        for (String notificationId : notifications.keySet()) {
            try {
                JSONObject json = new JSONObject((String) notifications.get(notificationId));
                Bundle bundle = BundleJSONConverter.convertToBundle(json);
                array.add(bundle);
            } catch (JSONException e) {
                Log.e(TAG, e.getMessage());
            }
        }
        return array;
    }

    void removeAllDeliveredNotifications(Promise promise) {
        notificationManager.cancelAll();
        promise.resolve(null);
    }

    void removeDeliveredNotification(String notificationId, Promise promise) {
        notificationManager.cancel(notificationId.hashCode());
        promise.resolve(null);
    }

    void removeDeliveredNotificationsByTag(String tag, Promise promise) {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            StatusBarNotification[] statusBarNotifications = notificationManager.getActiveNotifications();
            for (StatusBarNotification statusBarNotification : statusBarNotifications) {
                if (tag.equals(statusBarNotification.getTag())) {
                    notificationManager.cancel(statusBarNotification.getTag(), statusBarNotification.getId());
                }
            }
        }

        promise.resolve(null);
    }

    private void displayNotification(Bundle notification, Promise promise) {
        new DisplayNotificationTask(
                context,
                reactContext,
                notificationManager,
                notification,
                promise
        ).execute();
    }

    private NotificationChannelGroup parseChannelGroupMap(ReadableMap channelGroupMap) {
        if (Build.VERSION.SDK_INT >= 26) {
            String groupId = channelGroupMap.getString("groupId");
            String name = channelGroupMap.getString("name");

            NotificationChannelGroup notificationChannelGroup = new NotificationChannelGroup(
                    groupId,
                    name
            );

            if (Build.VERSION.SDK_INT >= 28 && channelGroupMap.hasKey("description")) {
                String description = channelGroupMap.getString("description");
                notificationChannelGroup.setDescription(description);
            }

            return notificationChannelGroup;
        }

        return null;
    }

    private String getFileName(Uri uri) {
        String result = null;
        if (uri.getScheme() == "content") {
            Cursor cursor = reactContext.getContentResolver().query(uri, null, null, null, null);
            try {
                if (cursor != null && cursor.moveToFirst()) {
                    result = cursor.getString(cursor.getColumnIndexOrThrow(OpenableColumns.DISPLAY_NAME));
                }
            } finally {
                if (cursor != null) cursor.close();
            }
        }

        if (result == null) {
            result = uri.getPath();
            if (result != null) {
                int cut = result.lastIndexOf('/');
                if (cut != -1) {
                    result = result.substring(cut + 1);
                } else {
                    result = "default";
                }
            }
        }

        if (result.equals("notification_sound")) result = "default";

        return result;
    }

    @RequiresApi(api = 26)
    private WritableArray createChannelsArray(List<NotificationChannel> notificationChannels) {
        WritableArray writableArray = Arguments.createArray();

        if (Build.VERSION.SDK_INT >= 26) {
            int size = notificationChannels.size();
            for (int i = 0; i < size; i++) {
                writableArray.pushMap(createChannelMap(notificationChannels.get(i)));
            }
        }

        return writableArray;
    }

    @RequiresApi(api = 26)
    private WritableArray createChannelGroupsArray(List<NotificationChannelGroup> notificationChannelGroups) {
        WritableArray writableArray = Arguments.createArray();

        if (Build.VERSION.SDK_INT >= 26) {
            int size = notificationChannelGroups.size();
            for (int i = 0; i < size; i++) {
                writableArray.pushMap(createChannelGroupMap(notificationChannelGroups.get(i)));
            }
        }

        return writableArray;
    }

    @RequiresApi(api = 26)
    private WritableMap createChannelGroupMap(NotificationChannelGroup notificationChannelGroup) {
        WritableMap writableMap = Arguments.createMap();

        if (Build.VERSION.SDK_INT >= 26) {
            writableMap.putString("groupId", notificationChannelGroup.getId());
            writableMap.putString("name", notificationChannelGroup.getName().toString());
            writableMap.putArray("channels", createChannelsArray(notificationChannelGroup.getChannels()));
            if (Build.VERSION.SDK_INT >= 28) {
                writableMap.putString("description", notificationChannelGroup.getDescription());
            }
        }

        return writableMap;
    }

    @RequiresApi(api = 26)
    private WritableMap createChannelMap(NotificationChannel notificationChannel) {
        if (notificationChannel == null) return null;
        WritableMap writableMap = Arguments.createMap();

        if (Build.VERSION.SDK_INT >= 26) {
            writableMap.putString("channelId", notificationChannel.getId());
            writableMap.putString("name", notificationChannel.getName().toString());
            writableMap.putInt("importance", notificationChannel.getImportance());
            writableMap.putString("description", notificationChannel.getDescription());

            writableMap.putBoolean("bypassDnd", notificationChannel.canBypassDnd());
            writableMap.putString("group", notificationChannel.getGroup());
            writableMap.putString(
                    "lightColor",
                    String.format("#%06X", (0xFFFFFF & notificationChannel.getLightColor()))
            );
            writableMap.putBoolean("lightsEnabled", notificationChannel.shouldShowLights());

            int visibility = notificationChannel.getLockscreenVisibility();
            if (visibility == -1000) { // -1000 = not set
                writableMap.putNull("lockScreenVisibility");
            } else {
                writableMap.putInt("lockScreenVisibility", visibility);
            }

            writableMap.putBoolean("showBadge", notificationChannel.canShowBadge());
            writableMap.putString("sound", getFileName(notificationChannel.getSound()));
            writableMap.putBoolean("vibrationEnabled", notificationChannel.shouldVibrate());

            long[] vibration = notificationChannel.getVibrationPattern();
            WritableArray vibrationArray = Arguments.createArray();
            if (vibration != null) {
                for (long aVibration : vibration) {
                    vibrationArray.pushDouble(aVibration);
                }
            }
            writableMap.putArray("vibrationPattern", vibrationArray);
        }

        return writableMap;
    }

    @RequiresApi(api = 26)
    private NotificationChannel parseChannelMap(ReadableMap channelMap) {
        if (Build.VERSION.SDK_INT >= 26) {
            String channelId = channelMap.getString("channelId");
            String name = channelMap.getString("name");
            int importance = channelMap.getInt("importance");

            NotificationChannel channel = new NotificationChannel(channelId, name, importance);
            if (channelMap.hasKey("bypassDnd")) {
                channel.setBypassDnd(channelMap.getBoolean("bypassDnd"));
            }
            if (channelMap.hasKey("description")) {
                channel.setDescription(channelMap.getString("description"));
            }
            if (channelMap.hasKey("group")) {
                channel.setGroup(channelMap.getString("group"));
            }
            if (channelMap.hasKey("lightColor")) {
                String lightColor = channelMap.getString("lightColor");
                channel.setLightColor(Color.parseColor(lightColor));
            }
            if (channelMap.hasKey("lightsEnabled")) {
                channel.enableLights(channelMap.getBoolean("lightsEnabled"));
            }
            if (channelMap.hasKey("lockScreenVisibility")) {
                channel.setLockscreenVisibility(channelMap.getInt("lockScreenVisibility"));
            }
            if (channelMap.hasKey("showBadge")) {
                channel.setShowBadge(channelMap.getBoolean("showBadge"));
            }
            if (channelMap.hasKey("sound")) {
                Uri sound = getSound(context, channelMap.getString("sound"));
                channel.setSound(sound, null);
            }
            if (channelMap.hasKey("vibrationEnabled")) {
                channel.enableVibration(channelMap.getBoolean("vibrationEnabled"));
            }
            if (channelMap.hasKey("vibrationPattern")) {
                ReadableArray vibrationArray = channelMap.getArray("vibrationPattern");
                long[] vibration = new long[vibrationArray.size()];
                for (int i = 0; i < vibrationArray.size(); i++) {
                    vibration[i] = (long) vibrationArray.getDouble(i);
                }
                channel.setVibrationPattern(vibration);
            }
            return channel;
        }

        return null;
    }

}
