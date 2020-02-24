import React, {Component, ReactNode} from 'react';
import {View, Text} from 'react-native';
import styles from '../Constants/styles';

export default class RegisterScreen extends Component
{
    render(): ReactNode
    {
        const registerScreen: ReactNode =
        (
            <View style={styles.screen}>
                <Text>
                    This is the register screen
                </Text>
            </View>
        )
        return registerScreen
    }
}