import { expect } from 'chai';
import AuthForm from '../src/0-ApiLibrary/types/AuthForm';
import AuthLib from '../src/0-ApiLibrary/interfaces/AuthLib';

describe('Auth Library', function()
{

    it('knows new user', function()
    {
        let req = AuthLib.authRequest(NewUserForm);
        expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/New-User');
        expect(req.reqType).to.equal('post');
        expect(req.body.email).to.equal('user@example.com');
        expect(req.body.password).to.equal('123456');
        expect(req.body.confirmPassword).to.equal('123456');
    });

    it('knows login', function()
    {
        let req = AuthLib.authRequest(LoginForm);
        expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Login');
        expect(req.reqType).to.equal('post');
        expect(req.body.email).to.equal('user@example.com');
        expect(req.body.password).to.equal('123456');
    });

    it('knows refresh token', function()
    {
        let req = AuthLib.authRequest(RefreshTokenForm);
        expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Refresh-Token?email=user@example.com');
        expect(req.reqType).to.equal('post');
        expect(req.body.email).to.equal('user@example.com');
    });

    const NewUserForm: AuthForm =
    {
        id: 'New-User',
        parameters:
        {
            email: 'user@example.com',
            password: '123456',
            confirmPassword: '123456'
        }
    }

    const LoginForm: AuthForm =
    {
        id: 'Login',
        parameters:
        {
            email: 'user@example.com',
            password: '123456',
        }
    }

    const RefreshTokenForm: AuthForm =
    {
        id: 'Refresh-Token',
        parameters:
        {
            email: 'user@example.com',
        }
    }

});
