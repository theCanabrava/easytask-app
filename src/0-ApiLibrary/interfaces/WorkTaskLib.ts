import WorkTaslForm from "../types/WorkTaskForm";
import ApiRequest from "../types/ApiRequest";
import ApiLibrary from "../ApiLibrary";

export default class WorkTaskLib
{
    public static workTaskRequest(form: WorkTaslForm): ApiRequest
    {
        return ApiLibrary.workTaskRequest(form);
    }
}