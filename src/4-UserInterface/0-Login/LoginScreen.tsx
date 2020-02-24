import React, {Component, ReactNode} from 'react';
import {KeyboardAvoidingView, TextInput} from 'react-native';
import styles from '../Constants/styles';
import DefaultButton from '../Reusables/DefaultButton';
import texts from '../Constants/texts';

export default class LoginScreen extends Component
{
    props;
    state

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
                    onPress={() => this.props.navigation.navigate('ProjectList')}
                />
                <DefaultButton
                    title={texts.SIGNUP_LBL}
                    onPress={() => this.props.navigation.navigate('Register')}
                />
            </KeyboardAvoidingView>
        )
        return loginScreen
    }
}