import AuthForm from "../types/AuthForm";
import ApiRequest from "../types/ApiRequest";
import ApiLibrary from "../ApiLibrary";

export default class AuthLib
{
    public static authRequest(form: AuthForm): ApiRequest
    {
        return ApiLibrary.authRequest(form);
    }
}