import React, {Component, ReactNode} from 'react';
import {FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import WorkTaskCell from './components/WorkTaskCell';
import DefaultButton from '../Reusables/DefaultButton';
import texts from '../Constants/texts';

import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import WorkTaskSubscriber from '../../1-WorkTaskManager/interfaces/WorkTaskSubscriber'
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';

class WorkTaskListScreen extends Component implements WorkTaskSubscriber
{
    props;
    state;
    toolset: AppToolset;
    dispatch: Dispatch;
    unsubscribe;

    constructor(props)
    {
        super(props);
    }

    render(): ReactNode
    {
        const projectId = this.props.route.params.projectId;
        const workTasks = this.props.workTasks.filter(work => work.projectId === projectId);
        workTasks.push({id: 'ADD'})

        const workTaskListScreen: ReactNode =
        (
            <FlatList
                data = {workTasks}
                renderItem = {this.renderItem.bind(this)}
            />
        )
        return workTaskListScreen
    }

    renderItem(itemData): ReactNode
    {
        const workTaskId = itemData.item.id;
        const projectId = this.props.route.params.projectId;
        const managerId = this.props.route.params.managerId;
        const uuid = this.props.user.uuid;
        const enableEdit = managerId === uuid;

        if(workTaskId === "ADD")
        {
            if(!enableEdit) return null;

            const addCell =
            (
                <DefaultButton
                    title = {texts.ADD_WORK_TASK}
                    onPress = {() => this.props.navigation.navigate('ManageWorkTask', {workTaskId, projectId})}
                />
            )
            return addCell
        } 
        else
        {
            const projectCell =
            (
                <WorkTaskCell
                    workTaskData = {itemData.item}
                    onPressAddResponsible = {() => this.props.navigation.navigate('AddResponsible', {workTaskId, projectId})}
                    onPressEdit = {() => this.props.navigation.navigate('ManageWorkTask', {workTaskId, projectId})}
                    enableEdit = {enableEdit}
                />
            )
            return projectCell;
        }
    }

    componentDidMount()
    {
        const projectId = this.props.route.params.projectId;
        this.toolset = this.props.toolset;
        this.dispatch = this.props.dispatch;
        this.toolset.workTaskManager.subscribe(this);
        this.toolset.workTaskManager.getWorkTasksOfProject(projectId);
        this.unsubscribe = this.props.navigation.addListener('focus', () => this.forceUpdate());
    }

    forceUpdate()
    {
        super.forceUpdate();
        const projectId = this.props.route.params.projectId;
        this.toolset.workTaskManager.getWorkTasksOfProject(projectId);
    }

    notify(response: ApiResponse)
    {
        if(response.path.includes(ApiConstants.paths.getWorkTasksOfProject))
        {
            if(response.status === 200)
            {
                const workTasks = response.data.data;

                this.dispatch(toolsetActions.reloadWorkTasks(workTasks));
            }
        }
    }

    componentWillUnmount()
    {
        this.toolset.workTaskManager.unsubscribe(this);
        if(this.unsubscribe) this.unsubscribe();
    }
}

function mapState(state) 
{
    const props =
    {
        toolset: state.toolset.toolset,
        user: state.toolset.user,
        workTasks: state.toolset.workTasks
    }
    return props;
}

export default connect(mapState, null)(WorkTaskListScreen);