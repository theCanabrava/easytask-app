import AuthCommunicator from "../interfaces/PushNotificationCommunicator";
import AuthDataSource from "../interfaces/PushNotificationDataSource";

export default interface AuthManagerComponents
{
    communicator: AuthCommunicator
    dataSource: AuthDataSource
}