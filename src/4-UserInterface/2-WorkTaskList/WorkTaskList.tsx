import React, {Component, ReactNode} from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
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
import WorkTaskData from '../../2-Database/types/WorkTaskData';
import icons from '../Constants/icons';
import FilterWorkTaskParameters from '../../1-WorkTaskManager/types/FilterWorkTaskParameters';
import StatusPickerFilter from './components/StatusFilterPicker'
import styles from '../Constants/styles';


class WorkTaskListScreen extends Component implements WorkTaskSubscriber
{
    props;
    state;
    toolset: AppToolset;
    dispatch: Dispatch;
    unsubscribe;
    navOptions: StackNavigationOptions =
    {
        headerRight: this.renderHeaderRight.bind(this),
        headerRightContainerStyle:{paddingRight: 20}
    };

    constructor(props)
    {
        super(props);
        this.state = {
            showPicker: false,
            filterId: 5
        };
    }

    render(): ReactNode
    {
        const projectId = this.props.route.params.projectId;
        const workTasks = this.props.workTasks.filter(work => work.projectId === projectId);
        const showPicker = this.state.showPicker
        workTasks.push({id: 'ADD'})

        const workTaskListScreen: ReactNode =
        (
            <View style={styles.sworkTaskScreen}>
            {
                showPicker && <>
                <StatusPickerFilter 
                    pickedFilter = {(filterId) => {this.setState({filterId: filterId})}}
                />
                <DefaultButton 
                title = 'Filtrar'
                onPress = {this.loadFilteredTasks.bind(this)} />
                </>
                
            }
            {
                !showPicker && 
                <FlatList
                data = {workTasks}
                renderItem = {this.renderItem.bind(this)}
                />
             }
            </View>
        )
        return workTaskListScreen
    }

    renderItem(itemData): ReactNode
    {
        const item: WorkTaskData = itemData.item;
        const workTaskId = item.id;
        const responsible = item.responsibleEmail;
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
                    onPressAddResponsible = {() => this.props.navigation.navigate('AddResponsible', {workTaskId, projectId, responsible})}
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
        this.props.navigation.setOptions(this.navOptions);
    }

    renderHeaderRight()
    {
        const header =
        (
            <TouchableOpacity
            onPress = {() => {this.setState({showPicker: !this.state.showPicker})}}>
                <Icon
                    name={icons.ICON_FILTER}
                    type={icons.ICON_TYPE}
                />
            </TouchableOpacity>
        )
        return header;
    }

    forceUpdate()
    {
        super.forceUpdate();
        const projectId = this.props.route.params.projectId;
        this.toolset.workTaskManager.getWorkTasksOfProject(projectId);
    }

    loadFilteredTasks()
    {
        const filterId = this.state.filterId;
        this.setState({showPicker: false});
        this.filterTasks(filterId);
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
        else if (response.path.includes(ApiConstants.paths.filterWorkTask))
        {
            if(response.status === 200)
            {
                const workTasks = response.data.data;
                console.log(workTasks)

                this.dispatch(toolsetActions.filterWorkTask(workTasks));
            }
        }
    }

    componentWillUnmount()
    {
        this.toolset.workTaskManager.unsubscribe(this);
        if(this.unsubscribe) this.unsubscribe();
    }

    async filterTasks(status: number)
    {
        this.setState({isLoading: true});
        const projectId: string = this.props.route.params.projectId;

        const filterWorkTasks: FilterWorkTaskParameters =
        {
            projectId: projectId,
            status: status
        }

        await this.toolset.workTaskManager.filterWorkTask(filterWorkTasks);

        this.setState({isLoading: false})
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