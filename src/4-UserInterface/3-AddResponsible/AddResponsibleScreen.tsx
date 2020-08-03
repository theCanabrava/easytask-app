import React, { Component, ReactNode } from 'react';
import { Dispatch } from 'redux';

import { FlatList, View, Alert, ActivityIndicator, ImageBackground, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from '../Constants/styles';
import texts from '../Constants/texts';

import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import AddResponsibleParameters from '../../1-WorkTaskManager/types/AddResponsibleParameters';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import MemberCell from '../3-AddResponsible/components/MemberCell';

const logoBackground = require('../Assets/bg.png');
const back = require('../Assets/back.png');

class AddResponsibleScreen extends Component
{
    props;
    state;
    toolset: AppToolset;
    dispatch: Dispatch;

    constructor(props)
    {
        super(props)
        this.state =
        {
            users: [],
            isLoading: true,
        }
    }

    render(): ReactNode
    {
        const isLoading = this.state.isLoading;

        if(isLoading)
        {
            let loadingScreen =
            (
                <View style={styles.screen}>
                    <ActivityIndicator/>
                </View>
            )

            return loadingScreen;
        }

        const manageMembersScreen: ReactNode =
        (
            <View style={styles.defaultScreen}>
                <ImageBackground source={logoBackground} style={styles.backgroundContainer}>
                    <View style={styles.backImageContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={back} style={styles.backImage}/>
                        </TouchableOpacity>
                        <Text style={styles.screenTitle}>{texts.MEMBER_LBL}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.workTaskContainer}>
                    <FlatList
                        style={styles.flatList}
                        data = {this.state.users}
                        renderItem = {this.renderItem.bind(this)}
                    />
                </View>
             </View>
        )
        return manageMembersScreen
    }

    componentDidMount()
    {
        const projectId = this.props.route.params.projectId;
        this.toolset = this.props.toolset;
        this.toolset.workTaskManager.subscribe(this);
        this.toolset.projectManager.subscribe(this);
        this.toolset.projectManager.getUsersInProject(projectId);
        this.setState({loading: true});
    }

    renderItem(itemData)
    {
        const responsible = this.props.route.params.responsible;
        const enableEdit = (responsible !== itemData.item.id);

        const memberCell =
        (
            <MemberCell
                email = {itemData.item.id}
                onPressAdd = {this.addResponsible.bind(this)}
                enableEdit = {enableEdit}
            />
        )

        return memberCell;
    }

    async addResponsible(email)
    {
        this.setState({isLoading: true});
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
        this.setState({isLoading: false});
        if(response.path.includes(ApiConstants.paths.addResponsible))
        {
            if(response.status === 200) this.handleSuccess();
            else this.handleFaillure();
        }
        else if(response.path.includes(ApiConstants.paths.getUsersInProject))
        {
            this.getUsers(response);
        }
    }

    handleSuccess()
    {
        this.props.navigation.pop();
    }

    handleFaillure()
    {
        Alert.alert(texts.FAIL, texts.NO_MEMBER_MSG);
    }

    getUsers(response: ApiResponse)
    {
        const users = [];
        for(const i in response.data.data)
        {
            users.push({id: response.data.data[i].email});
        }
        this.setState({users});
    }

    componentWillUnmount()
    {
        this.toolset.workTaskManager.unsubscribe(this);
        this.toolset.projectManager.unsubscribe(this);
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