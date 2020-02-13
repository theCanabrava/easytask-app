import AuthManagerComponents from "./types/AuthManagerComponents";
import NewUserParameters from "./types/NewUserParameters";
import LoginParameters from "./types/LoginParameters";
import AuthCommunicator from "./interfaces/AuthCommunicator";
import AuthDataSource from "./interfaces/AuthDataSource";
import AuthForm from "../0-ApiLibrary/types/AuthForm";
import ApiConstants from "../0-ApiLibrary/constants/ApiConstants";
import ApiRequest from "../0-ApiLibrary/types/ApiRequest";
import AuthLib from "../0-ApiLibrary/interfaces/AuthLib";
import CommunicatorDelegate from "./interfaces/CommunicatorDelegate"
import AuthSubscriber from "./interfaces/AuthSubscriber";
import ApiResponse from "../0-ApiLibrary/types/ApiResponse";

export default class AuthManager implements CommunicatorDelegate
{
    private token: string;
    private communicator: AuthCommunicator;
    private dataSource: AuthDataSource;
    private subscribers: AuthSubscriber[];

    constructor(components: AuthManagerComponents)
    {
        this.setCommunicator(components);
        this.setDataSource(components);
        this.setSubscribers(components);
    }

    private setCommunicator(components: AuthManagerComponents)
    {
        this.communicator = components.communicator;
        this.communicator.setDelegate(this);
    }

    private setDataSource(components: AuthManagerComponents)
    {
        this.dataSource = components.dataSource;
        this.token = this.dataSource.getToken();
    }

    private setSubscribers(components: AuthManagerComponents)
    {
        this.subscribers = [];
        for(let index in components.subscribers)
        {
            this.subscribe(components.subscribers[index])
        } 
    }

    public async newUser(userRegistration: NewUserParameters)
    {
        const newUserForm: AuthForm=
        {
            id: ApiConstants.auth.newUser,
            parameters: userRegistration,
        }

        const request: ApiRequest = AuthLib.authRequest(newUserForm);
        await this.communicator.send(request);
    }

    public async login(userCredentials: LoginParameters)
    {
        const loginForm: AuthForm=
        {
            id: ApiConstants.auth.login,
            parameters: userCredentials,
        }

        const request: ApiRequest = AuthLib.authRequest(loginForm);
        await this.communicator.send(request);
    }

    public async refreshToken(email: string)
    {
        const refreshForm: AuthForm =
        {
            id: ApiConstants.auth.refreshToken,
            parameters: 
            {
                email: email,
                token: this.token,
            }
        }

        const request: ApiRequest = AuthLib.authRequest(refreshForm);
        await this.communicator.send(request);
    }

    public subscribe(subscriber: AuthSubscriber)
    {
        this.subscribers[this.subscribers.length] = subscriber;
    }

    public unsubscribe(subscriber: AuthSubscriber)
    {
        this.subscribers = this.subscribers.filter(element => element !== subscriber);
    }

    public read(response: ApiResponse)
    {
        if(response.status == 200)
        {
            this.token = response.data.data;
        }
        for(let i in this.subscribers)
        {
            this.subscribers[i].notify(response);
        }
    }
}