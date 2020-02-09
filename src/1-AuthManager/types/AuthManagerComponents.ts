import AuthCommunicator from "../interfaces/AuthCommunicator";
import AuthDataSource from "../interfaces/AuthDataSource";
import AuthSubscriber from "../interfaces/AuthSubscriber";

export default interface AuthManagerComponents
{
    communicator: AuthCommunicator
    dataSource: AuthDataSource
    subscribers: AuthSubscriber[]
}