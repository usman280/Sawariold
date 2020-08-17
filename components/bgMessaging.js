// @flow
import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
// Optional flow type

export default async (RemoteMessage) => {
    // handle your message


    console.log("BGMEssageing", RemoteMessage);
    const remote = new firebase.notifications.Notification({
        sound: 'sampleaudio',
        show_in_background: true,
    })
        .setSound('sampleaudio.wav')
        .setNotificationId("090078601")
        .setTitle("App is Killed")
        .setBody("Chalri ha yaha bh")
        .android.setSmallIcon('@drawable/icon_liked') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here


    if (Platform.Version <= 25) {
        remote.android.setPriority(firebase.notifications.Android.Priority.Max)
    }
    else {
        remote.android.setChannelId('fcm_FirebaseNotification_default_channel')
    }

    firebase.notifications().getInitialNotification().then(notification => {
        const localNotification = new firebase.notifications.Notification({
            sound: 'sampleaudio',
            show_in_background: true,
        })
            .setSound('sampleaudio.wav')
            .setNotificationId(notification.notificationId)
            .setTitle(title)
            .setBody(body)
            .android.setSmallIcon('@drawable/icon_liked')
            .android.setColor('#000000')

        //firebase.notifications().removeAllDeliveredNotifications();
        const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotification_default_channel', 'Sawari', firebase.notifications.Android.Importance.Max)
            .setDescription('Demo app description')
            .setSound('sampleaudio.wav')

            firebase.notifications().android.createChannel(channel);

        if (Platform.Version <= 25) {
            localNotification.android.setPriority(firebase.notifications.Android.Priority.Max)
        }
        else {
            localNotification.android.setChannelId('fcm_FirebaseNotification_default_channel')
        }

        firebase.notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));

    })


    firebase.notifications()
        .displayNotification(remote)
        .catch(err => console.error(err));

    alert("Hello")

    return Promise.resolve();
}