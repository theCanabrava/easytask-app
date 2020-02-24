import React, {Component, ReactNode} from 'react';
import {View, Text} from 'react-native';
import styles from '../Constants/styles';

export default class ProjectListScreen extends Component
{
    render(): ReactNode
    {
        const projectListScreen: ReactNode =
        (
            <View style={styles.screen}>
                <Text>
                    This is the project list screen
                </Text>
            </View>
        )
        return projectListScreen
    }
}