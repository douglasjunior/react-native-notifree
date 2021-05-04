# Schedule

Object giving information about the schedule to use for a notification.

## Properties

### exact
[method]exact returns nullable boolean;[/method]

> Android only

If the fireDate should be respected exactly, i.e. for reminders, or if it can deviate slightly to save battery.

### fireDate
[method]fireDate returns number;[/method]

The date when the notification should first be shown, in milliseconds since 1970.

### repeatInterval
[method]repeatInterval returns nullable string;[/method]

How frequently the notification should be repeated.  One of `minute`, `hour`, `day` or `week`.

If not present, the notification will be displayed once.