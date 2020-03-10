import React, { Component, ReactNode } from 'react';
import { View } from 'react-native';
import styles from '../../Constants/styles';
import DefaultLabel from '../../Reusables/DefaultLabel';
import texts from '../../Constants/texts';
import DefaultButton from '../../Reusables/DefaultButton';

export default class MemberCell extends Component
{
    props;

    render(): ReactNode
    {
        const email: string = this.props.email;
        const enableEdit = this.props.enableEdit;
        
        const memberCell: ReactNode =
        (
            <View style={styles.memberCell}>
                <DefaultLabel>
                    {email}
                </DefaultLabel>
                {   enableEdit &&
                    <DefaultButton
                        style={styles.shortButton}
                        title={texts.ADD_BTN}
                        onPress={this.props.onPressAdd.bind(this, email)}
                    />
                }
                {
                    !enableEdit &&
                    <DefaultLabel>
                        {texts.RESPONSIBLE_LBL}
                    </DefaultLabel>
                }
            </View>
        );

        return memberCell;
    }
}