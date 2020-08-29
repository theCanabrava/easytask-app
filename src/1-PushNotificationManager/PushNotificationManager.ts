import CommunicatorDelegate from "./interfaces/CommunicatorDelagate";
import PushNotificationCommunicator from "./interfaces/PushNotificationCommunicator";
import PushNotificationComponents from "./types/PushNotificationComponents"
import PushNotificationDataSource from "./interfaces/PushNotificationDataSource"
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import ApiResponse from "../0-ApiLibrary/types/ApiResponse";
import PushNotificationForm from "../0-ApiLibrary/types/PushNotificationForm";
import ApiConstants from "../0-ApiLibrary/constants/ApiConstants";
import ApiRequest from "../0-ApiLibrary/types/ApiRequest";
import PushNotificationLib from "../0-ApiLibrary/interfaces/PushNotification";


export default class PushNotificationManager implements CommunicatorDelegate
{
    private token: string;
    private communicator: PushNotificationCommunicator;
    private dataSource: PushNotificationDataSource;

    constructor(components: PushNotificationComponents) {
        this.setCommunicator(components);
        this.setDataSource(components);
        this.token = this.dataSource.getToken();
    }

    private setCommunicator(components: PushNotificationComponents)
    {
        this.communicator = components.communicator;
        this.communicator.setDelegate(this); 
    }

    private setDataSource(components: PushNotificationComponents)
    {
        this.dataSource = components.dataSource;
        this.token = this.dataSource.getToken();
    }

    private async getPushNotificationToken(){

        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        
        const token = await Notifications.getExpoPushTokenAsync();

        console.log(token);

        return token;
    }

    public async sendPushNotificatioNToken(userEmail: string)
    {
        var pushNotificationToken =  await this.getPushNotificationToken()

        const sendPushNotificatioNTokenForm: PushNotificationForm =
        {
            id: ApiConstants.pushNotification.sendPushNotificationToken,
            parameters:
            {
                pushNotificationToken: pushNotificationToken,
                userEmail: userEmail,
                token: this.token
            }
        }

        const request: ApiRequest = PushNotificationLib.pushNotificationRequest(sendPushNotificatioNTokenForm)
        await this.communicator.send(request);
    }

    read(response: ApiResponse) {
        
    }

}
