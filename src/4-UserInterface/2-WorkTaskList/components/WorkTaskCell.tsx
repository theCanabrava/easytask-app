import React, { Component, ReactNode } from 'react';
import { View } from 'react-native';
import WorkTaskData from '../../../2-Database/types/WorkTaskData';
import styles from '../../Constants/styles';
import DefaultLabel from '../../Reusables/DefaultLabel';
import texts from '../../Constants/texts';
import DefaultButton from '../../Reusables/DefaultButton';

export default class WorkTaskCell extends Component
{
    props;

    render(): ReactNode
    {
        const workTaskData: WorkTaskData = this.props.workTaskData;
        const projectCell: ReactNode =
        (
            <View style={styles.projectCell}>
                <DefaultLabel>
                    {texts.NAME_LBL}: {workTaskData.workTaskName}
                </DefaultLabel>
                <DefaultLabel>
                    {texts.DESCRIPTION_LBL}: {workTaskData.description}
                </DefaultLabel>
                <DefaultLabel>
                    {texts.RESPONSIBLE_LBL}: {/*workTaskData.responsibleUserId*/}
                </DefaultLabel>
                <DefaultLabel>
                    {texts.START_DATE_LBL}: {workTaskData.startDate ? new Date(workTaskData.startDate).toLocaleTimeString() : ''}
                </DefaultLabel>
                <DefaultLabel>
                    {texts.EXPECTED_CONCLUSION_LBL}: {workTaskData.expectedConclusionDate ? new Date(workTaskData.expectedConclusionDate).toLocaleTimeString() : ''}
                </DefaultLabel>
                <DefaultLabel>
                    {texts.FINISH_DATE_LBL}: {workTaskData.finishDate ? new Date(workTaskData.finishDate).toLocaleTimeString() : ''}
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
                    title={texts.EDIT_WORK_TASK_LBL}
                    onPress={this.props.onPressEdit}
                />
            </View>
        );

        return projectCell;
    }
}