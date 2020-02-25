import React, {Component, ReactNode} from 'react';
import { Dispatch } from 'redux';
import { FlatList } from 'react-native';
import {connect} from 'react-redux';
import ProjectData from '../../2-Database/types/ProjectData';
import ProjectSubscriber from '../../1-ProjectManager/interfaces/ProjectSubscriber';
import DefaultButton from '../Reusables/DefaultButton';
import texts from '../Constants/texts';
import ProjectCell from './components/ProjectCell';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';

class ProjectListScreen extends Component implements ProjectSubscriber
{
    props;
    toolset: AppToolset;
    dispatch: Dispatch;

    constructor(props)
    {
        super(props);
    }
    
    render(): ReactNode
    {
        const projectListScreen: ReactNode =
        (
            <FlatList
                data = {this.props.projects}
                renderItem = {this.renderItem.bind(this)}
            />
        )
        return projectListScreen
    }

    renderItem(itemData): ReactNode
    {
        if(itemData.item.id === "ADD")
        {
            const addCell =
            (
                <DefaultButton
                    title = {texts.ADD_PROJECT_LBL}
                    onPress = {() => this.props.navigation.navigate('ManageProject')}
                />
            )
            return addCell
        } 
        else
        {
            const projectCell =
            (
                <ProjectCell
                    projectData = {itemData.item}
                    onPressWorkTasks = {() => this.props.navigation.navigate('WorkTaskList')}
                    onPressManageMembers = {() => {this.props.navigation.navigate('ManageMembers')}}
                    onPressManageProject = {() => this.props.navigation.navigate('ManageProject')}
                />
            )
            return projectCell;
        }
    }

    componentDidMount()
    {
        this.toolset = this.props.toolset;
        this.dispatch = this.props.dispatch;
        this.toolset.projectManager.subscribe(this);
        this.toolset.projectManager.getProjectsList(this.props.user.uuid);
    }

    notify(response: ApiResponse)
    {
        console.log(response);
        if(response.path.includes(ApiConstants.paths.getProjectsList))
        {
            if(response.status === 200)
            {
                const projects = response.data.data;
                this.dispatch(toolsetActions.reloadProjects(projects));
            }
        }
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
    console.log("Projects lists props loaded");
    return props;
}

export default connect(mapState, null)(ProjectListScreen);