import React, { Component, ReactNode } from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import styles from '../Constants/styles';

export default class DefaultButton extends Component
{
    props;

    render(): ReactNode
    {
        let defaultButton: ReactNode =
        (
            <View
                style = {{...styles.button, ...this.props.style}}
            >
                <TouchableOpacity
                    style = {{...styles.buttonContent}}
                    onPress = {this.props.onPress}
                >
                    <Text
                        style = {{...styles.buttonText, ...this.props.textStyle}}
                    >
                        {this.props.title}
                    </Text>
                </TouchableOpacity>
            </View>
        )

        return defaultButton
    }
}