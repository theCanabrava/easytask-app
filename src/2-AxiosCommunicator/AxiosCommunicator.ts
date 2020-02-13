import axios from 'axios';
import AuthCommunicator from '../1-AuthManager/interfaces/AuthCommunicator';
import CommunicatorDelegate from '../1-AuthManager/interfaces/CommunicatorDelegate';
import ApiRequest from '../0-ApiLibrary/types/ApiRequest';
import ApiResponse from '../0-ApiLibrary/types/ApiResponse';

export default class AxiosCommunicator implements AuthCommunicator
{
    private communicatorDelegate: CommunicatorDelegate;

    public setDelegate(communicatorDelegate: CommunicatorDelegate)
    {
        this.communicatorDelegate = communicatorDelegate;
    }

    public async send(request: ApiRequest)
    {
        await axios[request.reqType](request.url, request.body, {headers: request.headers})
            .then((axiosResponse) =>
            {
                const apiResponse = this.makeApiResponse(axiosResponse);
                this.communicatorDelegate.read(apiResponse);
            })
            .catch((axiosError) =>
            {
                const apiResponse = this.makeApiResponse(axiosError.response)
                this.communicatorDelegate.read(apiResponse);
            })
    }

    private makeApiResponse(axiosResponse): ApiResponse
    {
        const apiResponse: ApiResponse =
        {
            status: axiosResponse.status,
            path: axiosResponse.request.path,
            data: axiosResponse.data
        }
        return apiResponse
    }
}