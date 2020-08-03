import React, { Component, ReactNode } from 'react';
import { View, Text, Image } from 'react-native';
import ProjectData from '../../../2-Database/types/ProjectData';
import styles from '../../Constants/styles';
import DefaultLabel from '../../Reusables/DefaultLabel';
import texts from '../../Constants/texts';
import DefaultButton from '../../Reusables/DefaultButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const trash = require('../../Assets/Trash.png');

export default class MemberCell extends Component
{
    props;

    render(): ReactNode
    {
        const email: string = this.props.email;
        const enableEdit = this.props.enableEdit;
        const isManager = this.props.isManager;
        
        const memberCell: ReactNode =
        (
            <View style={styles.addMemberMemberCell}>
                <View style={styles.memberInfo}>
                    <DefaultLabel>
                        {email}
                    </DefaultLabel>
                    {
                        enableEdit &&
                        <>
                        {
                            !isManager &&
                            <DefaultButton
                            style={styles.addManagerButton}
                            title={texts.ADD_MANAGER_LBL}
                            onPress={this.props.onPressAddManager.bind(this, email)}
                            />
                        }
                        {
                            isManager &&
                            <DefaultLabel
                            style={styles.managerLabel}>
                            {texts.MANAGER_LBL}
                            </DefaultLabel>
                        }
                        </>
                    }
                </View>
                {   enableEdit &&
                    <TouchableOpacity
                    onPress={this.props.onPressRemove.bind(this, email)}>
                        <Image source={trash} style={styles.backImage}/>
                    </TouchableOpacity>
                }
            </View>
        );

        return memberCell;
    }
}