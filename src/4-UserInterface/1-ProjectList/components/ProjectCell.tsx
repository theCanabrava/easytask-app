import React, { Component, ReactNode } from 'react';
import { View, Text } from 'react-native';
import ProjectData from '../../../2-Database/types/ProjectData';
import styles from '../../Constants/styles';
import DefaultLabel from '../../Reusables/DefaultLabel';
import texts from '../../Constants/texts';
import DefaultButton from '../../Reusables/DefaultButton';

export default class ProjectCell extends Component
{
    props;

    render(): ReactNode
    {
        const projectData: ProjectData = this.props.projectData;
        const projectCell: ReactNode =
        (
            <View style={styles.projectCell}>
                <DefaultLabel>
                    {texts.NAME_LBL}: {projectData.projectName}
                </DefaultLabel>
                <DefaultLabel>
                    {texts.DESCRIPTION_LBL}: {projectData.description}
                </DefaultLabel>
                <DefaultLabel>
                    {texts.START_DATE_LBL}: {projectData.startDate ? new Date(projectData.startDate).toLocaleTimeString() : ''}
                </DefaultLabel>
                <DefaultLabel>
                    {texts.FINISH_DATE_LBL}: {projectData.finishDate ? new Date(projectData.finishDate).toLocaleTimeString() : ''}
                </DefaultLabel>
                <DefaultLabel>
                    {texts.COMPLETE_LBL}: {projectData.completed ? texts.YES_LBL : texts.NO_LBL}
                </DefaultLabel>
                <DefaultButton
                    title={texts.WORK_TASKS_LBL}
                    onPress={this.props.onPressWorkTasks}
                />
                <DefaultButton
                    title={texts.MANAGE_USERS_LBL}
                    onPress={this.props.onPressManageMembers}
                />
                <DefaultButton
                    title={texts.MANAGE_PROJECT_LBL}
                    onPress={this.props.onPressManageProject}
                />
            </View>
        );

        return projectCell;
    }
}