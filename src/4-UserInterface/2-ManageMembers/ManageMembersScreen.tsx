import React, {Component, ReactNode} from 'react';
import {View, Text} from 'react-native';
import styles from '../Constants/styles';

export default class ManageMembersScreen extends Component
{
    render(): ReactNode
    {
        const manageMembersScreen: ReactNode =
        (
            <View style={styles.screen}>
                <Text>
                    This is the manage members screen
                </Text>
            </View>
        )
        return manageMembersScreen
    }
}