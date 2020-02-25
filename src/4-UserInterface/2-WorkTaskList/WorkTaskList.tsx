import React, {Component, ReactNode} from 'react';
import { Dispatch } from 'redux';
import {FlatList} from 'react-native';
import { connect } from 'react-redux';

import WorkTaskCell from './components/WorkTaskCell';
import DefaultButton from '../Reusables/DefaultButton';
import texts from '../Constants/texts';

import WorkTaskSubscriber from '../../1-WorkTaskManager/interfaces/WorkTaskSubscriber'
import WorkTaskData from '../../2-Database/types/WorkTaskData';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';

class WorkTaskListScreen extends Component implements WorkTaskSubscriber
{
    props;
    state;
    toolset: AppToolset;
    dispatch: Dispatch;
    listener;

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
        if(itemData.item.id === "ADD")
        {
            const addCell =
            (
                <DefaultButton
                    title = {texts.ADD_WORK_TASK}
                    onPress = {() => this.props.navigation.navigate('ManageWorkTask')}
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
                    onPressEdit = {() => this.props.navigation.navigate('ManageWorkTask')}
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
        this.listener = this.props.navigation.addListener('focus', () => this.forceUpdate());
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
        this.toolset.projectManager.unsubscribe(this);
        if(this.listener) if(this.listener.remove) this.listener.remove();
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