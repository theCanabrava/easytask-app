import React, {Component, ReactNode} from 'react';
import { KeyboardAvoidingView, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from '../Constants/styles';
import DefaultButton from '../Reusables/DefaultButton';
import texts from '../Constants/texts';
import WorkTaskSubscriber from '../../1-WorkTaskManager/interfaces/WorkTaskSubscriber';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';
import WorkTaskData from '../../2-Database/types/WorkTaskData';
import CreateWorkTaskParameters from '../../1-WorkTaskManager/types/CreateWorkTaskParameters';
import UpdateWorkTaskParameters from '../../1-WorkTaskManager/types/UpdateWorkTaskParameters';
import DeleteTaskParameters from '../../1-WorkTaskManager/types/DeleteTaskParameters';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';

class ManageWorkTaskScreen extends Component implements WorkTaskSubscriber
{
    props;
    state;
    toolset: AppToolset;
    dispatch: Dispatch;
    
    constructor(props)
    {
        super(props);
        this.state =
        {
            workTaskName: '',
            description: '',
            expectedConclusionDate: '',
            where: '',
            why: '',
            how: '',
            howMuch: '',
            observation: '',
        }
    }

    render(): ReactNode
    {
        const workTaskName = this.state.workTaskName;
        const description = this.state.description;
        const expectedConclusionDate = this.state.expectedConclusionDate;
        const where = this.state.where;
        const why = this.state.why;
        const how = this.state.how;
        const howMuch = this.state.howMuch;
        const observation = this.state.observation;

        const workTaskId = this.props.route.params.workTaskId;
        const title = workTaskId === 'ADD' ? texts.CREATE_LBL : texts.CONFIRM_EDIT_LBL;

        const manageWorkTaskScreen: ReactNode =
        (
            <KeyboardAvoidingView 
            style={styles.screen}
            behavior='padding'
            >
                <TextInput
                    style={styles.input}
                    value={workTaskName}
                    onChangeText={(workTaskName) => this.setState({workTaskName})}
                    placeholder={texts.WORK_TASK_LBL}
                />
                <TextInput
                    multiline
                    style={styles.input}
                    value={description}
                    onChangeText={(description) => this.setState({description})}
                    placeholder={texts.DESCRIPTION_LBL}
                />
                <TextInput
                    style={styles.input}
                    value={expectedConclusionDate}
                    onChangeText={(expectedConclusionDate) => this.setState({expectedConclusionDate})}
                    placeholder={texts.EXPECTED_CONCLUSION_LBL}
                />
                <TextInput
                    style={styles.input}
                    value={where}
                    onChangeText={(where) => this.setState({where})}
                    placeholder={texts.WHERE_LBL}
                />
                <TextInput
                    style={styles.input}
                    value={why}
                    onChangeText={(why) => this.setState({why})}
                    placeholder={texts.WHY_LBL}
                />
                <TextInput
                    style={styles.input}
                    value={how}
                    onChangeText={(how) => this.setState({how})}
                    placeholder={texts.HOW_LBL}
                />
                <TextInput
                    style={styles.input}
                    value={howMuch}
                    onChangeText={(howMuch) => this.setState({howMuch})}
                    placeholder={texts.HOW_MUCH_LBL}
                />
                <TextInput
                    style={styles.input}
                    value={observation}
                    onChangeText={(observation) => this.setState({observation})}
                    placeholder={texts.OBSERVATION_LBL}
                />
                <DefaultButton
                    title={title}
                    onPress={this.submit.bind(this)}
                />
                {   workTaskId !== 'ADD' && 
                    <DefaultButton
                        title={texts.DELETE_LBL}
                        onPress={this.delete.bind(this)}
                    />
                }
            </KeyboardAvoidingView>
        )
        return manageWorkTaskScreen
    }

    componentDidMount()
    {
        this.toolset = this.props.toolset;
        this.dispatch = this.props.dispatch;
        this.toolset.workTaskManager.subscribe(this);
        const workTaskId = this.props.route.params.workTaskId;
        if(workTaskId !== 'ADD')
        {
            const workTask: WorkTaskData = this.props.workTasks.find(work => work.id === workTaskId);
            const newState =
            {
                workTaskName: workTask.workTaskName,
                description: workTask.description,
                expectedConclusionDate: workTask.expectedConclusionDate,
                where: workTask.where,
                why: workTask.why,
                how: workTask.how,
                howMuch: String(workTask.howMuch),
                observation: workTask.observation,
            }
            this.setState(newState);
        }
    }

    submit()
    {
        console.log('Submiting');
        const projectId = this.props.route.params.projectId;
        const workTaskId = this.props.route.params.workTaskId;
        const workTaskName = this.state.workTaskName;
        const description = this.state.description;
        //const expectedConclusionDate = this.state.expectedConclusionDate;
        const expectedConclusionDate = new Date().toISOString();
        const where = this.state.where;
        const why = this.state.why;
        const how = this.state.how;
        const howMuch = this.state.howMuch;
        const observation = this.state.observation;
        if(workTaskId === 'ADD')
        {
            const params: CreateWorkTaskParameters =
            {
                workTaskName: workTaskName,
                projectId: projectId,
                description: description,
                expectedConclusionDate: expectedConclusionDate,
                where: where,
                why: why,
                how: how,
                howMuch: Number(howMuch),
                observation: observation
            }
            this.toolset.workTaskManager.createWorkTask(params);
        }
        else
        {
            const params: UpdateWorkTaskParameters =
            {
                id: workTaskId,
                workTaskName: workTaskName,
                projectId: projectId,
                description: description,
                expectedConclusionDate: expectedConclusionDate,
                where: where,
                why: why,
                how: how,
                howMuch: Number(howMuch),
                observation: observation
            }
            this.toolset.workTaskManager.updateWorkTask(params);
        }
    }

    delete()
    {
        const projectId = this.props.route.params.projectId;
        const workTaskId = this.props.route.params.workTaskId;
        const params: DeleteTaskParameters =
        {
            id: workTaskId,
            projectId: projectId
        }
        this.toolset.workTaskManager.deleteWorkTask(params);
    }

    notify(response: ApiResponse)
    {
        console.log(response);
        if(response.path.includes(ApiConstants.paths.createWorkTask) 
            || response.path.includes(ApiConstants.paths.updateWorkTask))
        {
            if(response.status === 200)
            {
                this.dispatch(toolsetActions.updateWorkTask(response.data.data));
                this.props.navigation.pop();
            }
        }
        else if(response.path.includes(ApiConstants.paths.deleteProject))
        {
            if(response.status === 200)
            {
                const projectId = this.props.route.params.projectId;
                this.dispatch(toolsetActions.removeWorkTask(projectId));
                this.props.navigation.pop();
            }
        }
    }

    componentWillUnmount()
    {
        this.toolset.workTaskManager.unsubscribe(this);
    }
}

function mapState(state) 
{
    const props =
    {
        toolset: state.toolset.toolset,
        workTasks: state.toolset.workTasks
    }
    console.log("Projects lists props loaded");
    return props;
}

export default connect(mapState, null)(ManageWorkTaskScreen);