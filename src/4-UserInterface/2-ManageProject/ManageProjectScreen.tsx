import React, { Component, ReactNode } from 'react';
import { KeyboardAvoidingView, TextInput, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import DefaultButton from '../Reusables/DefaultButton';

import styles from '../Constants/styles';
import texts from '../Constants/texts';

import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import ProjectSubscriber from '../../1-ProjectManager/interfaces/ProjectSubscriber';
import CreateProjectParameters from '../../1-ProjectManager/types/CreateProjectParameters';
import EditProjectParameters from '../../1-ProjectManager/types/EditProjectParameters';
import DeleteProjectParameters from '../../1-ProjectManager/types/DeleteProjectParameters';
import ProjectData from '../../2-Database/types/ProjectData';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';

class ManageProjectScreen extends Component implements ProjectSubscriber
{
    props;
    state;
    toolset: AppToolset
    dispatch: Dispatch;
    
    constructor(props)
    {
        super(props);
        this.state =
        {
            projectName: '',
            description: '',
            loading: false
        }
    }

    render(): ReactNode
    {
        const projectName = this.state.projectName;
        const description = this.state.description;
        const loading = this.state.loading;
        const projectId = this.props.route.params.projectId;
        const title = projectId === 'ADD' ? texts.CREATE_LBL : texts.CONFIRM_EDIT_LBL;

        if(loading)
        {
            let loadingScreen =
            (
                <KeyboardAvoidingView style={styles.screen}>
                    <ActivityIndicator/>
                </KeyboardAvoidingView>
            )

            return loadingScreen;
        }

        const manageProjectScreen: ReactNode =
        (
            <KeyboardAvoidingView 
                style={styles.screen}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <TextInput
                    style={styles.input}
                    value={projectName}
                    onChangeText={(projectName) => this.setState({projectName})}
                    placeholder={texts.PROJECT_NAME_LBL}
                />
                <TextInput
                    multiline
                    style={styles.input}
                    value={description}
                    onChangeText={(description) => this.setState({description})}
                    placeholder={texts.DESCRIPTION_LBL}
                />
                <DefaultButton
                    title={title}
                    onPress={this.submit.bind(this)}
                />
                {   projectId !== 'ADD' && 
                    <DefaultButton
                        title={texts.DELETE_LBL}
                        onPress={this.delete.bind(this)}
                    />
                }
            </KeyboardAvoidingView>
        )
        return manageProjectScreen
    }

    componentDidMount()
    {
        this.toolset = this.props.toolset;
        this.dispatch = this.props.dispatch;
        this.toolset.projectManager.subscribe(this);
        const projectId = this.props.route.params.projectId;
        if(projectId !== 'ADD')
        {
            const project: ProjectData = this.props.projects.find(proj => proj.id === projectId);
            const newState =
            {
                projectName: project.projectName,
                description: project.description
            }
            this.setState(newState);
        }
    }

    submit()
    {
        this.setState({loading: true});
        const projectId = this.props.route.params.projectId;
        const projectName = this.state.projectName;
        const description = this.state.description;
        if(projectId === 'ADD')
        {
            const params: CreateProjectParameters =
            {
                projectName: projectName,
                description: description,
                managerId: this.props.user.uuid
            }
            this.toolset.projectManager.createProject(params);
        }
        else
        {
            const params: EditProjectParameters =
            {
                id: projectId,
                projectName: projectName,
                description: description,
                managerId: this.props.user.uuid
            }
            this.toolset.projectManager.editProject(params);
        }
    }

    delete()
    {
        this.setState({loading: true});
        const projectId = this.props.route.params.projectId;
        const params: DeleteProjectParameters =
        {
            id: projectId,
            managerId: this.props.user.uuid
        }
        this.toolset.projectManager.deleteProject(params);
    }

    notify(response: ApiResponse)
    {
        this.setState({loading: false});
        if(response.path.includes(ApiConstants.paths.createProject) 
            || response.path.includes(ApiConstants.paths.editProject))
        {
            if(response.status === 200) this.updateProject(response);
        }
        else if(response.path.includes(ApiConstants.paths.deleteProject))
        {
            if(response.status === 200) this.removeProject();
        }
    }

    updateProject(response: ApiResponse)
    {
        this.dispatch(toolsetActions.updateProject(response.data.data));
        this.props.navigation.pop();
    }

    removeProject()
    {
        const projectId = this.props.route.params.projectId;
        this.dispatch(toolsetActions.removeProject(projectId));
        this.props.navigation.pop();
    }

    componentWillUnmount()
    {
        this.toolset.projectManager.unsubscribe(this);
    }
}

function mapState(state) 
{
    const props =
    {
        toolset: state.toolset.toolset,
        user: state.toolset.user,
        projects: state.toolset.projects
    }
    return props;
}

export default connect(mapState, null)(ManageProjectScreen);