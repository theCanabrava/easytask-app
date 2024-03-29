import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../4-UserInterface/0-Register/RegisterScreen';
import LoginScreen from '../4-UserInterface/0-Login/LoginScreen';
import ProjectListScreen from '../4-UserInterface/1-ProjectList/ProjectListScreen';
import ManageMembersScreen from '../4-UserInterface/2-ManageMembers/ManageMembersScreen';
import ManageProjectScreen from '../4-UserInterface/2-ManageProject/ManageProjectScreen';
import WorkTaskListScreen from '../4-UserInterface/2-WorkTaskList/WorkTaskList';
import ManageWorkTaskScreen from '../4-UserInterface/3-ManageWorkTask/ManageWorkTaskScreen';
import texts from '../4-UserInterface/Constants/texts';
import AddResponsibleScreen from '../4-UserInterface/3-AddResponsible/AddResponsibleScreen';
import AppToolset from '../3-ToolsetFactory/types/AppToolset';

const Stack = createStackNavigator();

class AppNavigation extends Component
{
    render()
    {
        let appNavigation: ReactNode =
        (
            <Stack.Navigator
            screenOptions = {{
                headerShown: false
            }}>
                <Stack.Screen
                    name="ProjectList"
                    options=
                    {
                        {
                            title:texts.PROJECT_LIST_TTL
                        }
                    }
                    component={ProjectListScreen}    
                />
                <Stack.Screen
                    name="ManageMembers"
                    options=
                    {
                        {
                            title:texts.MANAGE_MEMBERS_TTL
                        }
                    }
                    component={ManageMembersScreen}    
                />
                <Stack.Screen
                    name="ManageProject"
                    options=
                    {
                        {
                            title:texts.MANAGE_PROJECT_TTL
                        }
                    }
                    component={ManageProjectScreen}    
                />
                <Stack.Screen
                    name="WorkTaskList"
                    options=
                    {
                        {
                            title:texts.WORK_TASK_LIST_TTL
                        }
                    }
                    component={WorkTaskListScreen}    
                />
                <Stack.Screen
                    name="ManageWorkTask"
                    options=
                    {
                        {
                            title:texts.MANAGE_WORK_TASK_TTL
                        }
                    }
                    component={ManageWorkTaskScreen}    
                />
                 <Stack.Screen
                    name="AddResponsible"
                    options=
                    {
                        {
                            title:texts.ADD_RESPONSIBLE_TTL
                        }
                    }
                    component={AddResponsibleScreen}    
                />
            </Stack.Navigator>
        )

        return appNavigation
    }
}

class LoginNavigation extends Component
{
    render()
    {
        const loginNavigator =
        (
            <Stack.Navigator
                screenOptions = 
                {
                    {
                        headerShown: false
                    }
                }
            >
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                />
            </Stack.Navigator>
        )

        return loginNavigator
    }
}

class MainNavigator extends Component
{
    props;
    toolset: AppToolset;

    render()
    {
        const loggedIn = this.props.user.uuid !== '';
        
        if(loggedIn) {
            this.toolset = this.props.toolset

            this.toolset.pushNotificationManager.sendPushNotificatioNToken(this.props.user.email)

            return (<AppNavigation/>)
        }
        else return (<LoginNavigation/>)
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

export default connect(mapState, undefined)(MainNavigator);