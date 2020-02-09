import ApiResponse from "../../0-ApiLibrary/types/ApiResponse";

export default interface CommunicatorDelegate
{
    read(response: ApiResponse);
}