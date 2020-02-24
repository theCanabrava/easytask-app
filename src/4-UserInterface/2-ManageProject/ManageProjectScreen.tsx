import React, {Component, ReactNode} from 'react';
import {View, Text} from 'react-native';
import styles from '../Constants/styles';

export default class ManageProjectScreen extends Component
{
    render(): ReactNode
    {
        const manageProjectScreen: ReactNode =
        (
            <View style={styles.screen}>
                <Text>
                    This is the manage project screen
                </Text>
            </View>
        )
        return manageProjectScreen
    }
}