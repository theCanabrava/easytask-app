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
            <Text
                style = {styles.labelText}
            >
                {this.props.children}
            </Text>
        )

        return defaultLabel
    }
}