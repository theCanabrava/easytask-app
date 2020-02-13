import ApiRequest from "../../0-ApiLibrary/types/ApiRequest";
import CommunicatorDelegate from "./CommunicatorDelegate"

export default interface AuthCommunicator
{
    send(request: ApiRequest);
    setDelegate(delegate: CommunicatorDelegate);
}