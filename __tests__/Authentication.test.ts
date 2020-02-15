import {expect} from 'chai';

import AuthManager from "../src/1-AuthManager/AuthManager";
import AxiosCommunicator from "../src/2-AxiosCommunicator/AxiosCommunicator";
import AuthSubscriber from "../src/1-AuthManager/interfaces/AuthSubscriber";
import AuthDataSource from "../src/1-AuthManager/interfaces/AuthDataSource";
import AuthManagerComponents from "../src/1-AuthManager/types/AuthManagerComponents";
import NewUserParameters from "../src/1-AuthManager/types/NewUserParameters";
import LoginParameters from "../src/1-AuthManager/types/LoginParameters";
import ApiResponse from "../src/0-ApiLibrary/types/ApiResponse";
import ApiConstants from "../src/0-ApiLibrary/constants/ApiConstants";

describe('Authentication', function()
{   
    it('Connects the authentication components', function () 
    {
        let components: AuthManagerComponents =
        {
            communicator: communicator,
            dataSource: dataSource,
            subscribers: [subscriber]
        };
        manager = new AuthManager(components);
    });

    it('Sends registration request', async function () 
    {
        let newUser: NewUserParameters =
        {
            email: 'teste@unitario.com',
            password: 'Teste@123',
            confirmPassword: 'Teste@123'
        }
        await manager.newUser(newUser);
    });

    it('Sends login request', async function()
    {
        let login: LoginParameters =
        {
            email: 'teste@unitario.com',
            password: 'Teste@123'
        }
        await manager.login(login);
    });

    it('Sends refresh token request', async function ()
    {
        await manager.refreshToken('teste@unitario.com');      
    })

    it('Unsubscribes', function()
    {
        manager.unsubscribe(subscriber);
    })

    let manager: AuthManager;
    const subscriber: AuthSubscriber =
    {
        notify(response: ApiResponse)
        {
            if(response.path==ApiConstants.paths.newUser)
            {
                expect(response.status).to.equal(400);
                expect(response.data.success).to.equal(false);
                expect(response.data.errors[0]).to.equal(`Login 'teste@unitario.com' já está sendo utilizado.`);
            }
            else if(response.path==ApiConstants.paths.login)
            {
                expect(response.status).to.equal(200);
                expect(response.data.success).to.equal(true);
                expect(response.data.data).to.not.equal(undefined);
            }
            else if(response.path==ApiConstants.paths.refreshToken)
            {
                expect(response.status).to.equal(403);
            }
        }
    };
    const dataSource: AuthDataSource =
    {
        getToken()
        {
            return '';
        }
    };
    const communicator = new AxiosCommunicator();
})