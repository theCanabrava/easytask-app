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
        if(request.reqType === 'post') await this.sendPost(request);
        else if(request.reqType === 'delete') await this.sendDelete(request);
        else await this.sendGet(request);
    }

    private async sendPost(request: ApiRequest)
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

    private async sendDelete(request: ApiRequest)
    {
        await axios.delete(request.url, {headers: request.headers, data: request.body})
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

    private async sendGet(request: ApiRequest)
    {
        await axios.get(request.url, {headers: request.headers})
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
        if(axiosResponse)
        {
            const apiResponse: ApiResponse =
            {
                status: axiosResponse.status,
                path: axiosResponse.config.url,
                data: axiosResponse.data
            }
            return apiResponse
        }
        else
        {
            const apiResponse: ApiResponse =
            {
                status: 401,
                path: '',
                data: {data: []}
            }
            return apiResponse;
        }
    }
}