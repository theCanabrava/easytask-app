import React, {Component, ReactNode} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import DefaultButton from '../Reusables/DefaultButton';
import ProjectCell from './components/ProjectCell';

import texts from '../Constants/texts';
import icons from '../Constants/icons';

import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';
import ProjectSubscriber from '../../1-ProjectManager/interfaces/ProjectSubscriber';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';
import cellIds from '../Constants/cellIds';

class ProjectListScreen extends Component implements ProjectSubscriber
{
    props;
    unsubscribeFocus;
    toolset: AppToolset;
    dispatch: Dispatch;
    navOptions: StackNavigationOptions =
    {
        headerRight: this.renderHeaderRight.bind(this),
        headerRightContainerStyle:{paddingRight: 20}
    };

    constructor(props)
    {
        super(props);
    }
    
    render(): ReactNode
    {
        const projectList = 
        [
            ...this.props.projects,
            {
                id: cellIds.ADD
            }
        ]
        const projectListScreen: ReactNode =
        (
            <FlatList
                data = {projectList}
                renderItem = {this.renderItem.bind(this)}
            />
        )
        return projectListScreen
    }

    renderItem(itemData): ReactNode
    {
        if(itemData.item.id === cellIds.ADD)
        {
            const addCell =
            (
                <DefaultButton
                    title = {texts.ADD_PROJECT_LBL}
                    onPress = {() => this.props.navigation.navigate('ManageProject', {projectId: itemData.item.id})}
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
                    uuid = {this.props.user.uuid}
                    onPressWorkTasks = {() => this.props.navigation.navigate('WorkTaskList', {projectId: itemData.item.id, managerId: itemData.item.managerId})}
                    onPressManageMembers = {() => {this.props.navigation.navigate('ManageMembers', {projectId: itemData.item.id, managerId: itemData.item.managerId})}}
                    onPressManageProject = {() => this.props.navigation.navigate('ManageProject', {projectId: itemData.item.id})}
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
        this.unsubscribeFocus = this.props.navigation.addListener('focus', () => this.forceUpdate());
        this.props.navigation.setOptions(this.navOptions);
    }

    renderHeaderRight()
    {
        const header =
        (
            <TouchableOpacity
                onPress={this.logout.bind(this)}
            >
                <Icon
                    name={icons.ICON_LOGOUT}
                    type={icons.ICON_TYPE}
                />
            </TouchableOpacity>
        )
        return header;
    }

    async logout()
    {
        await this.toolset.authManager.login({email:'', password: ''});
        this.dispatch(toolsetActions.removeUser());
        this.dispatch(toolsetActions.reloadProjects([]));
    }

    notify(response: ApiResponse)
    {
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
        if(this.unsubscribeFocus) this.unsubscribeFocus();
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

export default connect(mapState, null)(ProjectListScreen);