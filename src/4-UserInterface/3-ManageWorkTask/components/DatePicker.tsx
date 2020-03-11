import React, { Component, ReactNode } from 'react';
import { View, LayoutAnimation, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DefaultButton from '../../Reusables/DefaultButton';
import styles from '../../Constants/styles';
import texts from '../../Constants/texts';

export default class DatePicker extends Component
{
    props;
    state;

    constructor(props)
    {
        super(props);
        this.state = {show: false}
    }

    render(): ReactNode
    {
        const show = this.state.show;
        const value = this.props.value

        const datePicker =
        (
            <View style={styles.datePickerCell}>
                <DefaultButton
                    title={texts.EXPECTED_CONCLUSION_LBL}
                    onPress={this.onPress.bind(this)}
                />
                {
                    show &&
                    <DateTimePicker
                        style={styles.datePicker}
                        timeZoneOffsetInMinutes={0}
                        value={value}
                        mode="date"
                        display="default"
                        onChange={this.onChange.bind(this)}
                    />
                }
            </View>
        );

        return datePicker;
    }

    onPress()
    {
        const show = this.state.show;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({show: !show})
    }

    onChange(_, selectedDate)
    {
        const pickedDate = this.props.pickedDate;
        const value = this.props.value;
        const currentDate: Date = selectedDate || value;

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        console.log('Running picked date with:' + currentDate.toLocaleDateString());
        pickedDate(currentDate);
        this.setState({show: Platform.OS === 'ios'})
    }
}
