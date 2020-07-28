import React, { Component, ReactNode } from 'react';
import { Dispatch } from 'redux';

import { KeyboardAvoidingView, TextInput, Alert, ActivityIndicator, Platform, View, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import DefaultButton from '../Reusables/DefaultButton';

import styles from '../Constants/styles';
import texts from '../Constants/texts';

import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import LoginParameters from '../../1-AuthManager/types/LoginParameters';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';

const logoBackground = require('../Assets/bg.png');
const logo = require('../Assets/logo.png');

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
            isLoading: false

        }
    }

    render(): ReactNode
    {
        const email = this.state.email;
        const password = this.state.password;
        const isLoading = this.state.isLoading

        let commandPannel = 
        (
            <>
            <DefaultButton
                title={texts.LOGIN_LBL}
                onPress={this.login.bind(this)}
            />
            <DefaultButton
                title={texts.SIGNUP_LBL}
                onPress={() => this.props.navigation.navigate('Register')}
            />
            </>
        )
        if (isLoading) commandPannel = <ActivityIndicator style={{marginVertical:10}}/>

        const loginScreen: ReactNode =
        (
            <KeyboardAvoidingView 
                style={styles.loginScreen}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <ImageBackground source={logoBackground} style={styles.loginLogoContainer}>
                    <Image source={logo} style={styles.loginLogo}/>
                </ImageBackground>
                <View style={styles.loginContainer}>
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
                        keyboardType='default'
                        autoCapitalize='none'
                        secureTextEntry
                    />
                    {commandPannel}
                </View>
            </KeyboardAvoidingView>
        )
        return loginScreen
    }

    componentDidMount()
    {
        this.toolset = this.props.toolset;
        this.toolset.authManager.subscribe(this);
        this.dispatch = this.props.dispatch;
    }

    async login()
    {
        this.setState({isLoading: true});
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

    notify(response: ApiResponse)
    {
        if(response.path.includes(ApiConstants.paths.login))
        {
            if(response.status === 200) this.handleSuccess(response);
            else this.handleFaillure();
        }
    }

    handleSuccess(response: ApiResponse)
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

    handleFaillure()
    {
        this.setState({isLoading: false});
        Alert.alert(texts.FAIL, texts.LOGIN_MSG);
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

export default connect(mapState, null)(LoginScreen);