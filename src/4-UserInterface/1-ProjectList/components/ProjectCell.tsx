import React, { Component, ReactNode } from 'react';
import { View, TouchableOpacity } from 'react-native';
import ProjectData from '../../../2-Database/types/ProjectData';
import styles from '../../Constants/styles';
import DefaultLabel from '../../Reusables/DefaultLabel';
import texts from '../../Constants/texts';
import DefaultButton from '../../Reusables/DefaultButton';

export default class ProjectCell extends Component
{
    props;
    state;

    constructor(props)
    {
        super(props);
        this.state = { spread: false }
    }

    render(): ReactNode
    {
        const spread = this.state.spread
        const projectData: ProjectData = this.props.projectData;
        const projectCell: ReactNode =
        (
            <View 
                style=
                    {{
                        ...styles.projectCell,
                        height: spread ? undefined : 50
                    }}
                >
                <TouchableOpacity
                    onPress = {this.handleToggle.bind(this)}
                >
                    <DefaultLabel>
                        {texts.NAME_LBL}: {projectData.projectName}
                    </DefaultLabel>
                    <DefaultLabel>
                        {texts.DESCRIPTION_LBL}: {projectData.description}
                    </DefaultLabel>
                    <DefaultLabel>
                        {texts.START_DATE_LBL}: {projectData.startDate ? new Date(projectData.startDate).toLocaleDateString(undefined, {timeZone: 'UTC'}) : ''}
                    </DefaultLabel>
                    <DefaultLabel>
                        {texts.FINISH_DATE_LBL}: {projectData.finishDate ? new Date(projectData.finishDate).toLocaleDateString(undefined, {timeZone: 'UTC'}) : ''}
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
                </TouchableOpacity>
            </View>
        );

        return projectCell;
    }

    handleToggle()
    {
        this.setState({spread: !this.state.spread})
    }
}