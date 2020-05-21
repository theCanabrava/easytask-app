import React, { Component, ReactNode } from 'react';
import { Icon } from 'react-native-elements';
import { View, TouchableOpacity, LayoutAnimation } from 'react-native';
import WorkTaskData from '../../../2-Database/types/WorkTaskData';
import styles from '../../Constants/styles';
import DefaultLabel from '../../Reusables/DefaultLabel';
import texts from '../../Constants/texts';
import DefaultButton from '../../Reusables/DefaultButton';
import { StackNavigationOptions } from '@react-navigation/stack';
import icons from '../../Constants/icons';

export default class WorkTaskCell extends Component
{
    props;
    state;
    navOptions: StackNavigationOptions =
    {
        headerRight: this.renderHeaderRight.bind(this),
        headerRightContainerStyle:{paddingRight: 20}
    };

    constructor(props)
    {
        super(props)
        this.state = {expanded: false};
    }

    renderHeaderRight()
    {
        const header =
        (
            <TouchableOpacity>
                <Icon
                    name={icons.ICON_LOGOUT}
                    type={icons.ICON_TYPE}
                />
            </TouchableOpacity>
        )
        return header;
    }

    render(): ReactNode
    {
        const expanded = this.state.expanded;
        const workTaskData: WorkTaskData = this.props.workTaskData;
        const enableEdit = this.props.enableEdit;
        const expectedConclusionDate = new Date(workTaskData.expectedConclusionDate).toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0,10).split('-')

        const projectCell: ReactNode =
        (
            <View style={styles.projectCell}>
                <TouchableOpacity
                    onPress = {this.handleToggle.bind(this)}
                >
                    <DefaultLabel>
                        {texts.NAME_LBL}: {workTaskData.workTaskName}
                    </DefaultLabel>
                    <DefaultLabel>
                        {texts.RESPONSIBLE_LBL}: {workTaskData.responsibleEmail ? workTaskData.responsibleEmail : texts.NO_RESPONSIBLE_FLD}
                    </DefaultLabel>
                    <DefaultLabel>
                        {expanded ? `${texts.EXPECTED_CONCLUSION_LBL}: ` : ''}{this.formatDateString(workTaskData.expectedConclusionDate)}
                    </DefaultLabel>
                    { 
                        expanded &&
                        <>
                            <DefaultLabel>
                                {texts.START_DATE_LBL}: {this.formatDateString(workTaskData.startDate)}
                            </DefaultLabel>
                            <DefaultLabel>
                                {texts.FINISH_DATE_LBL}: {this.formatDateString(workTaskData.finishDate)}
                            </DefaultLabel>
                            <DefaultLabel>
                                {texts.DESCRIPTION_LBL}: {workTaskData.description}
                            </DefaultLabel>
                            <DefaultLabel>
                                {texts.WHERE_LBL}: {workTaskData.where}
                            </DefaultLabel>
                            <DefaultLabel>
                                {texts.WHY_LBL}: {workTaskData.why}
                            </DefaultLabel>
                            <DefaultLabel>
                                {texts.HOW_LBL}: {workTaskData.how}
                            </DefaultLabel>
                            <DefaultLabel>
                                {texts.HOW_MUCH_LBL}: {workTaskData.howMuch}
                            </DefaultLabel>
                            <DefaultLabel>
                                {texts.OBSERVATION_LBL}: {workTaskData.observation}
                            </DefaultLabel>
                            {   enableEdit &&
                                <>
                                    <DefaultButton
                                        title={texts.ADD_RESPONSIBLE_LBL}
                                        onPress={this.props.onPressAddResponsible}
                                    />
                                    <DefaultButton
                                        title={texts.EDIT_WORK_TASK_LBL}
                                        onPress={this.props.onPressEdit}
                                    />
                                </>
                            }
                        </>
                    }  
                </TouchableOpacity>
            </View>
        );

        return projectCell;
    }

    handleToggle()
    {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded: !this.state.expanded})
    }

    formatDateString(dateString:string){
        if(dateString === null || dateString === undefined) return ''

        const date = new Date(dateString).toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0,10).split('-')

        return date[2] + '/' + date[1] + '/' + date[0]
    }
}