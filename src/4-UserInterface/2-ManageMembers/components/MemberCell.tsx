import React, { Component, ReactNode } from 'react';
import { View, Text } from 'react-native';
import ProjectData from '../../../2-Database/types/ProjectData';
import styles from '../../Constants/styles';
import DefaultLabel from '../../Reusables/DefaultLabel';
import texts from '../../Constants/texts';
import DefaultButton from '../../Reusables/DefaultButton';

export default class MemberCell extends Component
{
    props;

    render(): ReactNode
    {
        const email: ProjectData = this.props.email;
        const memberCell: ReactNode =
        (
            <View style={styles.memberCell}>
                <DefaultLabel>
                    {email}
                </DefaultLabel>
                <DefaultButton
                    style={styles.shortButton}
                    title={texts.REMOVE_LBL}
                    onPress={this.props.onPressRemove.bind(this, email)}
                />
            </View>
        );

        return memberCell;
    }
}