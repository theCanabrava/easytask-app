import React, {Component, ReactNode} from 'react';
import {KeyboardAvoidingView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import styles from '../Constants/styles';
import DefaultButton from '../Reusables/DefaultButton';
import texts from '../Constants/texts';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import LoginParameters from '../../1-AuthManager/types/LoginParameters';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';
import { Dispatch } from 'redux';
import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';

class LoginScreen extends Component
{
    props;
    state;
    toolset: AppToolset;
    dispatch: Dispatch

    constructor(props)
    {
        super(props)
        this.state =
        {
            email: '',
            password: '',
        }
    }

    render(): ReactNode
    {
        const email = this.state.email;
        const password = this.state.password;

        const loginScreen: ReactNode =
        (
            <KeyboardAvoidingView 
                style={styles.screen}
                behavior='padding'
            >
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(email) => this.setState({email})}
                    placeholder={texts.EMAIL_LBL}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(password) => this.setState({password})}
                    placeholder={texts.PASSWORD_LBL}
                />
                <DefaultButton
                    title={texts.LOGIN_LBL}
                    onPress={this.login.bind(this)}
                />
                <DefaultButton
                    title={texts.SIGNUP_LBL}
                    onPress={() => this.props.navigation.navigate('Register')}
                />
            </KeyboardAvoidingView>
        )
        return loginScreen
    }

    componentDidMount()
    {
        console.log("Login component mounted");
        this.toolset = this.props.toolset;
        this.toolset.authManager.subscribe(this);
        this.dispatch = this.props.dispatch;
    }

    notify(response: ApiResponse)
    {
        if(response.status === 200 && response.path.includes(ApiConstants.paths.login))
        {
            this.dispatch(toolsetActions.updateUser(
                {
                    email: this.state.email,
                    uuid: this.toolset.userStorage.getUser().uuid,
                    webtoken: this.toolset.userStorage.getUser().webtoken
                }
            ));
            this.toolset.userStorage.updateUser({email: this.state.email});
            this.props.navigation.navigate('ProjectList');
        }
    }

    async login()
    {
        const email:string = this.state.email;
        const password: string = this.state.password;
        if(email.length !== 0 && password.length !== 0)
        {
            const loginParameters: LoginParameters =
            {
                email: email,
                password: password
            }
            await this.toolset.authManager.login(loginParameters);
        }
    }

    componentWillUnmount()
    {
        this.toolset.authManager.unsubscribe(this);
        console.log("Login component unmounted");
    }
}

function mapState(state) 
{
    const props =
    {
        toolset: state.toolset.toolset,
        user: state.toolset.user
    }
    console.log("Login props loaded");
    return props;
}

export default connect(mapState, null)(LoginScreen);