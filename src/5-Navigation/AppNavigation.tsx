import React, { Component, ReactNode } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../4-UserInterface/0-Register/RegisterScreen';
import LoginScreen from '../4-UserInterface/0-Login/LoginScreen';
import ProjectListScreen from '../4-UserInterface/1-ProjectList/ProjectListScreen';
import ManageMembersScreen from '../4-UserInterface/2-ManageMembers/ManageMembersScreen';
import ManageProjectScreen from '../4-UserInterface/2-ManageProject/ManageProjectScreen';
import WorkTaskListScreen from '../4-UserInterface/2-WorkTaskList/WorkTaskList';
import ManageWorkTaskScreen from '../4-UserInterface/3-ManageWorkTask/ManageWorkTaskScreen';

const Stack = createStackNavigator();

export default class AppNavigation extends Component
{
    render()
    {
        let appNavigation: ReactNode =
        (
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}    
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                />
                <Stack.Screen
                    name="ProjectList"
                    component={ProjectListScreen}    
                />
                <Stack.Screen
                    name="ManageMembers"
                    component={ManageMembersScreen}    
                />
                <Stack.Screen
                    name="ManageProject"
                    component={ManageProjectScreen}    
                />
                <Stack.Screen
                    name="WorkTaskList"
                    component={WorkTaskListScreen}    
                />
                <Stack.Screen
                    name="ManageWorkTask"
                    component={ManageWorkTaskScreen}    
                />
            </Stack.Navigator>
        )

        return appNavigation
    }
}