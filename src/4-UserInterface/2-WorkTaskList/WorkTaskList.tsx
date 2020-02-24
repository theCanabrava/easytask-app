import React, {Component, ReactNode} from 'react';
import {View, Text} from 'react-native';
import styles from '../Constants/styles';

export default class WorkTaskListScreen extends Component
{
    render(): ReactNode
    {
        const workTaskListScreen: ReactNode =
        (
            <View style={styles.screen}>
                <Text>
                    This is the work task list screen
                </Text>
            </View>
        )
        return workTaskListScreen
    }
}