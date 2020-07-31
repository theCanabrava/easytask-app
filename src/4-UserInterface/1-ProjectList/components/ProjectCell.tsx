import React, { Component, ReactNode } from 'react';
import { View, TouchableOpacity, LayoutAnimation } from 'react-native';
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
        this.state = { expanded: false }
    }

    render(): ReactNode
    {
        const expanded = this.state.expanded
        const projectData: ProjectData = this.props.projectData;
        const uuid = this.props.uuid;
        const enableEdit = projectData.managerId === uuid;

        const projectCell: ReactNode =
        (
            <View style={styles.projectCell}>
                <TouchableOpacity
                    onPress = {this.handleToggle.bind(this)}
                >
                    <DefaultLabel style = {{color: '#385398', fontWeight: 'bold'}}>
                        {projectData.projectName}
                    </DefaultLabel>
                    {
                        expanded &&
                        <View style = {{alignItems: 'center'}}>
                            <DefaultLabel style = {{color: '#616161'}}>
                                {projectData.description}
                            </DefaultLabel>
                            <DefaultButton
                                title={texts.WORK_TASKS_LBL}
                                onPress={this.props.onPressWorkTasks}
                            />
                            <DefaultButton
                                title={texts.MANAGE_USERS_LBL}
                                onPress={this.props.onPressManageMembers}
                            />
                            {   enableEdit &&
                                <DefaultButton
                                    title={texts.MANAGE_PROJECT_LBL}
                                    onPress={this.props.onPressManageProject}
                                />
                            }   
                        </View>
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