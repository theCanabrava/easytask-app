import { expect } from 'chai';
import AuthDataSource from '../src/1-AuthManager/interfaces/AuthDataSource';
import AuthCommunicator from '../src/1-AuthManager/interfaces/AuthCommunicator';
import ApiRequest from '../src/0-ApiLibrary/types/ApiRequest';
import AuthManager from '../src/1-AuthManager/AuthManager';
import NewUserParameters from '../src/1-AuthManager/types/NewUserParameters';
import LoginParameters from '../src/1-AuthManager/types/LoginParameters';
import CommunicatorDelegate from '../src/1-AuthManager/interfaces/CommunicatorDelegate';

class DummyDS implements AuthDataSource
{
    getToken()
    {
        return 'dummyToken';
    }
}

class DummyComunicator implements AuthCommunicator
{
    public latestRequest: ApiRequest;
    private delegate: CommunicatorDelegate

    public send(request: ApiRequest)
    {
        this.latestRequest = request
    }

    public setDelegate(delegate: CommunicatorDelegate)
    {
        this.delegate = delegate
    }
}

describe('Authentication Manager', function()
{
    describe('Requisitions', function()
    {
        const dummyDS = new DummyDS();
        const dummyComunicator = new DummyComunicator();
        const manager = new AuthManager({dataSource: dummyDS, communicator: dummyComunicator, subscribers: []});

        it('Sends registration request', function()
        {
            manager.newUser(newUser);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/New-User');
            expect(dummyComunicator.latestRequest.reqType).to.equal('post');
            expect(dummyComunicator.latestRequest.body.email).to.equal('user@example.com');
            expect(dummyComunicator.latestRequest.body.password).to.equal('123456');
            expect(dummyComunicator.latestRequest.body.confirmPassword).to.equal('123456');
        });

        it('Sends login request', function()
        {
            manager.login(login);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Login');
            expect(dummyComunicator.latestRequest.reqType).to.equal('post');
            expect(dummyComunicator.latestRequest.body.email).to.equal('user@example.com');
            expect(dummyComunicator.latestRequest.body.password).to.equal('123456');
        });

        it('Sends refresh token request', function()
        {
            manager.refreshToken(refresh);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Refresh-Token?email=user@example.com');
            expect(dummyComunicator.latestRequest.reqType).to.equal('post');
            expect(dummyComunicator.latestRequest.body.email).to.equal('user@example.com');
        });

        const newUser: NewUserParameters =
        {
            email: 'user@example.com',
            password: '123456',
            confirmPassword: '123456'
        };

        const login: LoginParameters =
        {
            email: 'user@example.com',
            password: '123456',
        }

        const refresh = 'user@example.com'
    });
})