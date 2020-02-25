import React, {Component, ReactNode} from 'react';
import { Dispatch } from 'redux';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import AddMemberForm from './components/AddMemberFrom';
import MemberCell from './components/MemberCell';
import ApiResponse from '../../0-ApiLibrary/types/ApiResponse';
import ProjectSubscriber from '../../1-ProjectManager/interfaces/ProjectSubscriber';
import AppToolset from '../../3-ToolsetFactory/types/AppToolset';
import * as toolsetActions from '../../3-ToolsetFactory/actions/toolset';
import ApiConstants from '../../0-ApiLibrary/constants/ApiConstants';
import ManageUserParameters from '../../1-ProjectManager/types/ManageUserParameters';
import { useRoute } from '@react-navigation/native';

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
            users: []
        }
    }

    render(): ReactNode
    {
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
        if(itemData.item.id === "ADD")
        {
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
                    onPressRemove = {this.delete.bind(this)}
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
    }

    add(email)
    {
        const params: ManageUserParameters =
        {
            projectId: this.props.route.params.projectId,
            userEmail: email
        }
        this.toolset.projectManager.addUserToProject(params);
    }

    delete(email)
    {
        const params: ManageUserParameters =
        {
            projectId: this.props.route.params.projectId,
            userEmail: email
        }
        this.toolset.projectManager.removeUserFromProject(params);
    }

    notify(response: ApiResponse)
    {
        if(response.path.includes(ApiConstants.paths.getUsersInProject) && response.status===200)
        {
            const users = [];
            for(const i in response.data.data)
            {
                users.push({id: response.data.data[i].email});
            }
            users.push({id: 'ADD'});
            this.setState({users});
        }
        else if(response.path.includes(ApiConstants.paths.addUserToProject) && response.status===200)
        {
            const users = this.state.users;
            users.pop();
            users.push({id: response.data.data.userEmail});
            users.push({id: 'ADD'});
            this.setState({users});
        }
        else if(response.path.includes(ApiConstants.paths.removeUserFromProject) && response.status===200)
        {
            const email = response.data.data.userEmail;
            const users = this.state.users;
            const index = users.findIndex(user => user.id === email)
            users.splice(index, 1);
            this.setState({users});
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
    }
    return props;
}

export default connect(mapState, null)(ManageMembersScreen);