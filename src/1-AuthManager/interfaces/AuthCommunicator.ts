import ApiRequest from "../../0-ApiLibrary/types/ApiRequest";

export default interface AuthCommunicator
{
    send(request: ApiRequest);
}