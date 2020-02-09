import { expect } from 'chai';
import CommunicatorDelegate from '../src/1-AuthManager/interfaces/CommunicatorDelegate';
import AxiosCommunicator from '../src/2-AxiosCommunicator/AxiosCommunicator';
import ApiRequest from '../src/0-ApiLibrary/types/ApiRequest';
import ApiResponse from '../src/0-ApiLibrary/types/ApiResponse';

describe('Axios Communicator', function () 
{
    it('Sends get API requests', async function()
    {
       await communicator.send(getRequest);
    });    

    it('Sends post API requests', async function()
    {
        await communicator.send(postRequest);
    });

    it('Sends delete API requests', async function () 
    {
        await communicator.send(deleteRequest);
    });

    const dummyDelegate : CommunicatorDelegate =
    {
        read(response: ApiResponse)
        {
            expect(response.status).to.equal(200);
        }
    }

    const communicator = new AxiosCommunicator();
    communicator.setDelegate(dummyDelegate);

    const getRequest: ApiRequest =
    {
        url: 'https://postman-echo.com/get?hello=world',
        reqType: 'get',
        body: {},
    };

    const postRequest: ApiRequest =
    {
        url: 'https://postman-echo.com/post',
        reqType: 'post',
        body:
        {
            hello: 'world'
        }
    };

    const deleteRequest: ApiRequest = 
    {
        url: 'https://postman-echo.com/delete',
        reqType: 'delete',
        body: {}
    };
});