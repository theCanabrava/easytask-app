import React, {Component, ReactNode} from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import AddMemberForm from './components/AddMemberFrom';
import MemberCell from './components/MemberCell';

import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import ManageUserParameters from '../../1-ProjectManager/types/ManageUserParameters';
import ProjectSubscriber from '../../1-ProjectManager/interfaces/ProjectSubscriber';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import styles from '../Constants/styles';

class ManageMembersScreen extends Component implements ProjectSubscriber
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
            users: [],
            loading: false
        }
    }

    render(): ReactNode
    {
        const loading = this.state.loading;

        if(loading)
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
            <FlatList
                data = {this.state.users}
                renderItem = {this.renderItem.bind(this)}
            />
        )
        return manageMembersScreen
    }

    renderItem(itemData)
    {
        const managerId = this.props.route.params.managerId;
        const uuid = this.props.user.uuid;

        const enableEdit = (managerId === uuid);

        if(itemData.item.id === "ADD")
        {
            if(!enableEdit) return null;
            
            const addMember =
            (
                <AddMemberForm
                    onPressAdd = {this.add.bind(this)}
                />
            )

            return addMember
        }
        else
        {
            const memberCell =
            (
                <MemberCell
                    email = {itemData.item.id}
                    isManager = {itemData.item.isManager}
                    onPressRemove = {this.delete.bind(this)}
                    onPressAddManager = {this.addManager.bind(this)}
                    enableEdit = {enableEdit}
                />
            )

            return memberCell;
        }
    }

    componentDidMount()
    {
        const projectId = this.props.route.params.projectId;
        this.toolset = this.props.toolset;
        this.dispatch = this.props.dispatch;
        this.toolset.projectManager.subscribe(this);
        this.toolset.projectManager.getUsersInProject(projectId);
        this.setState({loading: true});
    }

    add(email)
    {
        this.setState({loading: true});
        const params: ManageUserParameters =
        {
            projectId: this.props.route.params.projectId,
            userEmail: email
        }
        this.toolset.projectManager.addUserToProject(params);
    }

    delete(email)
    {
        this.setState({loading: true});
        const params: ManageUserParameters =
        {
            projectId: this.props.route.params.projectId,
            userEmail: email
        }
        this.toolset.projectManager.removeUserFromProject(params);
    }

    addManager(email)
    {
        this.setState({loading: true});
        const params: ManageUserParameters =
        {
            projectId: this.props.route.params.projectId,
            userEmail: email
        }
        this.toolset.projectManager.addManagerToProject(params);
    }

    notify(response: ApiResponse)
    {
        this.setState({loading: false});
        if(response.path.includes(ApiConstants.paths.getUsersInProject) && response.status===200)
        {
            this.getUsers(response);
        }
        else if(response.path.includes(ApiConstants.paths.addUserToProject) && response.status===200)
        {
            this.addUser(response);
        }
        else if(response.path.includes(ApiConstants.paths.removeUserFromProject) && response.status===200)
        {
            this.removeUser(response);
        }
        else if(response.path.includes(ApiConstants.paths.addManagerToProject) && response.status===200){
            this.addManagerToProject(response)
        }
    }

    getUsers(response: ApiResponse)
    {
        const users = [];
        for(const i in response.data.data)
        {
            users.push({id: response.data.data[i].email, isManager: response.data.data[i].isManager});
        }
        users.push({id: 'ADD'});
        this.setState({users});
    }

    addUser(response: ApiResponse)
    {
        const users = this.state.users;
        users.pop();
        users.push({id: response.data.data.userEmail});
        users.push({id: 'ADD'});
        this.setState({users});
    }

    removeUser(response: ApiResponse)
    {
        const email = response.data.data.userEmail;
        const users = this.state.users;
        const index = users.findIndex(user => user.id === email)
        users.splice(index, 1);
        this.setState({users});
    }

    addManagerToProject(response: ApiResponse)
    {
        const email = response.data.data.userEmail;
        const users = this.state.users;
        const index = users.findIndex(user => user.id === email)
        users[index].isManager = true
        this.setState({users});
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
    }
    return props;
}

export default connect(mapState, null)(ManageMembersScreen);