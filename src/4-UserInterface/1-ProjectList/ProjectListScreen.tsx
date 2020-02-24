import React, {Component, ReactNode} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from '../Constants/styles';
import ProjectData from '../../2-Database/types/ProjectData';
import DefaultButton from '../Reusables/DefaultButton';
import texts from '../Constants/texts';
import ProjectCell from './components/ProjectCell';

const dummyData: ProjectData[] =
[
    {
        id: '1',
        projectName: 'Project 1',
        description: 'Description 1',
        startDate: new Date().toISOString(),
        finishDate: new Date().toISOString(),
        managerId: 'MEEEE',
        completed: false
    },
    {
        id: '2',
        projectName: 'Project 2',
        description: 'Description 2',
        startDate: new Date().toISOString(),
        finishDate: new Date().toISOString(),
        managerId: 'MEEEE',
        completed: false
    },
    {
        id: '3',
        projectName: 'Project 3',
        description: 'Description 3',
        startDate: new Date().toISOString(),
        finishDate: new Date().toISOString(),
        managerId: 'MEEEE',
        completed: false
    }, 
    {
        id: '4',
        projectName: 'Project 4',
        description: 'Description 4',
        startDate: new Date().toISOString(),
        finishDate: new Date().toISOString(),
        managerId: 'MEEEE',
        completed: false
    },
    {
        id: 'ADD'
    }  
]

export default class ProjectListScreen extends Component
{
    props;
    state;

    constructor(props)
    {
        super(props);
    }
    
    render(): ReactNode
    {
        const projectListScreen: ReactNode =
        (
            <FlatList
                data = {dummyData}
                renderItem = {this.renderItem.bind(this)}
            />
        )
        return projectListScreen
    }

    renderItem(itemData): ReactNode
    {
        if(itemData.item.id === "ADD")
        {
            const addCell =
            (
                <DefaultButton
                    title = {texts.ADD_PROJECT_LBL}
                    onPress = {() => this.props.navigation.navigate('ManageProject')}
                />
            )
            return addCell
        } 
        else
        {
            const projectCell =
            (
                <ProjectCell
                    projectData = {itemData.item}
                    onPressWorkTasks = {() => this.props.navigation.navigate('WorkTaskList')}
                    onPressManageMembers = {() => {this.props.navigation.navigate('ManageMembers')}}
                    onPressManageProject = {() => this.props.navigation.navigate('ManageProject')}
                />
            )
            return projectCell;
        }
    }
}