import React, {Component, ReactNode} from 'react';
import {View, Text} from 'react-native';
import styles from '../Constants/styles';

export default class ManageWorkTaskScreen extends Component
{
    render(): ReactNode
    {
        const manageWorkTaskScreen: ReactNode =
        (
            <View style={styles.screen}>
                <Text>
                    This is the manage work task screen
                </Text>
            </View>
        )
        return manageWorkTaskScreen
    }
}