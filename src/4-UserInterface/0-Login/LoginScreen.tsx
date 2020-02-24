import React, {Component, ReactNode} from 'react';
import {View, Text, Button} from 'react-native';
import styles from '../Constants/styles';

export default class LoginScreen extends Component
{
    props;

    render(): ReactNode
    {
        const loginScreen: ReactNode =
        (
            <View style={styles.screen}>
                <Text>
                    This is the login screen
                </Text>
                <Button
                    title="Next"
                    onPress={() => this.props.navigation.navigate('ManageWorkTask')}
                />
            </View>
        )
        return loginScreen
    }
}