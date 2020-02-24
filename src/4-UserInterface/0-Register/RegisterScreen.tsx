import React, {Component, ReactNode} from 'react';
import {KeyboardAvoidingView, TextInput} from 'react-native';
import DefaultButton from '../Reusables/DefaultButton';
import styles from '../Constants/styles';
import texts from '../Constants/texts';

export default class RegisterScreen extends Component
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
                    onPress={() => this.props.navigation.navigate('ProjectList')}
                />
            </KeyboardAvoidingView>
        )
        return registerScreen
    }
}