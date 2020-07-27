import ApiRequest from "../types/ApiRequest";
import ApiLibrary from "../ApiLibrary";
import PushNotificationForm from "../types/PushNotificationForm";

export default class PushNotificationLib
{
    public static pushNotificationRequest(form: PushNotificationForm): ApiRequest
    {
        return ApiLibrary.pushNotificationRequest(form);
    }
}