import React, {Component, ReactNode} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, TextInput, Alert, ActivityIndicator } from 'react-native';

import DefaultButton from '../Reusables/DefaultButton';
import styles from '../Constants/styles';
import texts from '../Constants/texts';

import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import AuthSubscriber from '../../1-AuthManager/interfaces/AuthSubscriber';
import NewUserParameters from '../../1-AuthManager/types/NewUserParameters';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';

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
            isLoading: false
        }
    }

    render(): ReactNode
    {
        const email = this.state.email;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        const isLoading = this.state.isLoading;

        let commandPannel = 
        (
            <DefaultButton
                title={texts.SIGNUP_LBL}
                onPress={this.signUp.bind(this)}
            />
        )
        if (isLoading) commandPannel = <ActivityIndicator style={{marginVertical:10}}/>
        
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
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(password) => this.setState({password})}
                    placeholder={texts.PASSWORD_LBL}
                    autoCapitalize='none'
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                    placeholder={texts.CONFIRM_PASSWORD_LBL}
                    autoCapitalize='none'
                    secureTextEntry
                />
                {commandPannel}
            </KeyboardAvoidingView>
        )
        return registerScreen
    }

    componentDidMount()
    {
        this.toolset = this.props.toolset;
        this.dispatch = this.props.dispatch;
        this.toolset.authManager.subscribe(this);
    }

    async signUp()
    {
        const email:string = this.state.email;
        const password: string = this.state.password;
        const confirmPassword: string = this.state.confirmPassword;
        if(email.length !== 0 && password.length !== 0)
        {
            this.setState({isLoading: true});
            const newUserParameters: NewUserParameters =
            {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
            await this.toolset.authManager.newUser(newUserParameters);
        }
    }

    notify(response: ApiResponse)
    {
        if(response.path.includes(ApiConstants.paths.newUser))
        {
            if(response.status === 200) this.handleSuccess();
            else this.handleFaillure(response);
        }
    }

    handleSuccess()
    {
        this.dispatch(toolsetActions.updateUser(
            {
                email: this.state.email,
                uuid: this.toolset.userStorage.getUser().uuid,
                webtoken: this.toolset.userStorage.getUser().webtoken
            }
        ));
        this.toolset.userStorage.updateUser({email: this.state.email});
    }

    handleFaillure(response: ApiResponse)
    {
        const error = response.data.errors ? response.data.errors[0] : texts.SIGNUP_MSG;
        this.setState({isLoading: false});
        Alert.alert(texts.FAIL, error);
    }

    componentWillUnmount()
    {
        this.toolset.authManager.unsubscribe(this);
    }
}

function mapState(state) 
{
    const props =
    {
        toolset: state.toolset.toolset,
        user: state.toolset.user
    }
    return props;
}

export default connect(mapState)(RegisterScreen);