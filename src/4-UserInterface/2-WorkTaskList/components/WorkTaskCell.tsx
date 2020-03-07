import React, { Component, ReactNode } from 'react';
import { View, TouchableOpacity, LayoutAnimation } from 'react-native';
import WorkTaskData from '../../../2-Database/types/WorkTaskData';
import styles from '../../Constants/styles';
import DefaultLabel from '../../Reusables/DefaultLabel';
import texts from '../../Constants/texts';
import DefaultButton from '../../Reusables/DefaultButton';

export default class WorkTaskCell extends Component
{
    props;
    state;

    constructor(props)
    {
        super(props)
        this.state = {expanded: false};
    }

    render(): ReactNode
    {
        const expanded = this.state.expanded;
        const workTaskData: WorkTaskData = this.props.workTaskData;
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
                        {expanded ? `${texts.EXPECTED_CONCLUSION_LBL}: ` : ''}{workTaskData.expectedConclusionDate ? new Date(workTaskData.expectedConclusionDate).toLocaleDateString(undefined, {timeZone: 'UTC'}) : ''}
                    </DefaultLabel>
                    { 
                        expanded &&
                        <>
                            <DefaultLabel>
                                {texts.START_DATE_LBL}: {workTaskData.startDate ? new Date(workTaskData.startDate).toLocaleDateString(undefined, {timeZone: 'UTC'}) : ''}
                            </DefaultLabel>
                            <DefaultLabel>
                                {texts.FINISH_DATE_LBL}: {workTaskData.finishDate ? new Date(workTaskData.finishDate).toLocaleDateString(undefined, {timeZone: 'UTC'}) : ''}
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
}