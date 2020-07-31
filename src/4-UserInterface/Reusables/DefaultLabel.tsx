import React, { Component, ReactNode } from 'react';
import { View,  Text} from 'react-native';
import styles from '../Constants/styles';

export default class DefaultLabel extends Component
{
    props;

    render(): ReactNode
    {
        let defaultLabel: ReactNode =
        (
            <View
                style = {styles.label}
            >
                <Text
                    style = {{...styles.labelText, ...this.props.style}}
                >
                    {this.props.children}
                </Text>
            </View>
        )

        return defaultLabel
    }
}