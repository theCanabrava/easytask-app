import React, { Component, ReactNode } from 'react';
import { Dispatch } from 'redux';

import { KeyboardAvoidingView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import DefaultButton from '../Reusables/DefaultButton';

import styles from '../Constants/styles';
import texts from '../Constants/texts';

import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import LoginParameters from '../../1-AuthManager/types/LoginParameters';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';
import AddResponsibleParameters from '../../1-WorkTaskManager/types/AddResponsibleParameters';

class AddResponsibleScreen extends Component
{
    props;
    state;
    toolset: AppToolset;
    dispatch: Dispatch

    constructor(props)
    {
        super(props)
        this.state =
        {
            email: '',
            isLoading: false

        }
    }

    render(): ReactNode
    {
        const email = this.state.email;
        const isLoading = this.state.isLoading

        let commandPannel = 
        (
            <DefaultButton
            title={texts.LOGIN_LBL}
            onPress={this.login.bind(this)}
            />
        )
        if (isLoading) commandPannel = <ActivityIndicator style={{marginVertical:10}}/>

        const addResponsibleScreen: ReactNode =
        (
            <KeyboardAvoidingView 
                style={styles.screen}
                behavior='padding'
            >
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(email) => this.setState({email})}
                    placeholder={texts.EMAIL_LBL}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                {commandPannel}
            </KeyboardAvoidingView>
        )
        return addResponsibleScreen
    }

    componentDidMount()
    {
        this.toolset = this.props.toolset;
        this.toolset.workTaskManager.subscribe(this);
        this.dispatch = this.props.dispatch;
    }

    async login()
    {
        this.setState({isLoading: true});
        const email:string = this.state.email;
        const projectId: string = this.props.route.params.projectId;
        const workTaskId: string = this.props.route.params.workTaskId;

        const addResponsibleParameters: AddResponsibleParameters =
        {
            userEmail: email,
            projectId: projectId,
            workTaskId: workTaskId
        }
        await this.toolset.workTaskManager.addResponsibleToWorkTask(addResponsibleParameters);
    }

    notify(response: ApiResponse)
    {
        if(response.path.includes(ApiConstants.paths.addResponsible))
        {
            if(response.status === 200) this.handleSuccess();
            else this.handleFaillure();
        }
    }

    handleSuccess()
    {
        this.props.navigation.pop();
    }

    handleFaillure()
    {
        this.setState({isLoading: false});
        Alert.alert(texts.FAIL, texts.NO_MEMBER_MSG);
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
        user: state.toolset.user
    }
    return props;
}

export default connect(mapState, null)(AddResponsibleScreen);