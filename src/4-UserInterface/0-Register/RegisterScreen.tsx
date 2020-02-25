import React, {Component, ReactNode} from 'react';
import {KeyboardAvoidingView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import DefaultButton from '../Reusables/DefaultButton';
import styles from '../Constants/styles';
import texts from '../Constants/texts';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import { Dispatch } from 'redux';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import AuthSubscriber from '../../1-AuthManager/interfaces/AuthSubscriber';
import NewUserParameters from '../../1-AuthManager/types/NewUserParameters';

class RegisterScreen extends Component implements AuthSubscriber
{
    props;
    state;
    toolset: AppToolset;
    dispatch: Dispatch;

    constructor(props)
    {
        super(props)
        this.state =
        {
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    render(): ReactNode
    {
        const email = this.state.email;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        
        const registerScreen: ReactNode =
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
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                    placeholder={texts.CONFIRM_PASSWORD_LBL}
                />
                <DefaultButton
                    title={texts.SIGNUP_LBL}
                    onPress={this.signUp.bind(this)}
                />
            </KeyboardAvoidingView>
        )
        return registerScreen
    }

    componentDidMount()
    {
        this.toolset = this.props.toolset;
        this.dispatch = this.props.dispatch;
        this.toolset.authManager.subscribe(this);
        console.log("Register mounted");
    }

    notify(response: ApiResponse)
    {
        if(response.status === 200)
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

    async signUp()
    {
        const email:string = this.state.email;
        const password: string = this.state.password;
        const confirmPassword: string = this.state.confirmPassword;
        if(email.length !== 0 && password.length !== 0)
        {
            const newUserParameters: NewUserParameters =
            {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
            await this.toolset.authManager.newUser(newUserParameters);
        }
    }

    componentWillUnmount()
    {
        this.toolset.authManager.unsubscribe(this);
        console.log("Register unmounted");
    }
}

function mapState(state) 
{
    const props =
    {
        toolset: state.toolset.toolset,
        user: state.toolset.user
    }
    console.log("Register props loaded");
    return props;
}

export default connect(mapState)(RegisterScreen);