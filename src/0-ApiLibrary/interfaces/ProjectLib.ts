import ProjectForm from "../types/ProjectForm";
import ApiRequest from "../types/ApiRequest";
import ApiLibrary from "../ApiLibrary";

export default class ProjectLib
{
    public static projectRequest(form: ProjectForm): ApiRequest
    {
        return ApiLibrary.projectRequest(form);
    }
}