package com.github.douglasjunior.reactNativeNotifree.notifications;

import android.content.Intent;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

import javax.annotation.Nullable;

public class RNFirebaseBackgroundNotificationActionsService extends HeadlessJsTaskService {
    @Override
    protected @Nullable
    HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        if (RNFirebaseBackgroundNotificationActionReceiver.isBackgroundNotficationIntent(intent)) {
            WritableMap notificationOpenMap = RNFirebaseBackgroundNotificationActionReceiver.toNotificationOpenMap(intent);

            return new HeadlessJsTaskConfig(
                    "RNFirebaseBackgroundNotificationAction",
                    notificationOpenMap,
                    60000,
                    true
            );
        }
        return null;
    }
}
