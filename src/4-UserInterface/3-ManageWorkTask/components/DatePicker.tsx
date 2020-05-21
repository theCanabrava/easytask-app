import React, { Component, ReactNode } from 'react';
import { View, LayoutAnimation, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DefaultButton from '../../Reusables/DefaultButton';
import styles from '../../Constants/styles';
import texts from '../../Constants/texts';
import DefaultLabel from '../../Reusables/DefaultLabel';

export default class DatePicker extends Component
{
    props;
    state;

    constructor(props)
    {
        super(props);
        this.state = 
        {
            show: false,
            date: new Date()
        }
    }

    render(): ReactNode
    {
        const show = this.state.show;
        const value = this.props.value
        const date = this.state.date;

        const datePicker =
        (
            <View style={styles.datePickerCell}>
                <DefaultButton
                    title={texts.EXPECTED_CONCLUSION_LBL}
                    onPress={this.onPress.bind(this)}
                />

                <DefaultLabel>
                    {this.formatDateString(value.toISOString())}
                </DefaultLabel>

                {
                    
                    show &&
                    <DateTimePicker
                        style={styles.datePicker}
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        mode="date"
                        display="spinner"
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
        this.setState({show: Platform.OS === 'ios' })

        const pickedDate = this.props.pickedDate;
        const value = this.props.value;
        const currentDate: Date = selectedDate || value;

        this.state.date = currentDate;

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        pickedDate(currentDate);
    }

    formatDateString(dateString:string){
        if(dateString === null || dateString === undefined) return ''

        const date = new Date(dateString).toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0,10).split('-')

        return date[2] + '/' + date[1] + '/' + date[0]
    }
}
