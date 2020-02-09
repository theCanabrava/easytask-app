import ApiResponse from "../../0-ApiLibrary/types/ApiResponse";

export default interface AuthSubscriber
{
    notify(response: ApiResponse)
}